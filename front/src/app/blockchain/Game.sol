// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract GameContract {
    uint8 private constant GAME_CREATION_FEE = 50;
    uint8 private constant GAME_BASE_REWARD = 1;
    uint8 private constant INITIAL_CREDIT = 100;
    uint8 private constant MIN_QUESTIONS_COUNT = 10;
    uint8 private constant MAX_QUESTIONS_COUNT = 100;
    uint8 private constant FAIL_TRESHOLD = 60;

    struct Question {
        string context;
        string answer;
        string wrongOption_1;
        string wrongOption_2;
        string wrongOption_3;
    }

    struct GameDetails {
        string title;
        string description;
        uint256 price;
        uint8 numQuestions;
        string thumbnails;
    }

    struct GameStats {
        uint256 numBuyers;
        uint256 rating;
        uint256 numRaters;
    }

    struct Game {
        uint256 id;
        GameDetails details;
        GameStats stats;
        mapping(uint8 => Question) questions;
        address creator;
        bool isComplete;
    }

    struct PlayerGameStats {
        bool isCreator;
        bool isPurchased;
        uint8 highscore;
        uint8 rating; // from 0 to 100
    }

    struct Player {
        bool isRegistered;
        uint256 credit;
        uint256[] createdGames;
        uint256[] purchasedGames;
        mapping(uint256 => PlayerGameStats) gameStats;
    }

    uint256 private numGames;
    mapping(uint256 => Game) private games;
    mapping(address => Player) private players;

    event PlayerRegistered(address playerId);
    event GameInfoAdded(address playerId, uint256 gameId);
    event GameCreated(uint256 gameId);
    event GamePurchased(address playerId, uint256 gameId);
    event NewHighscore(address playerId, uint256 gameId, uint8 highscore);


    modifier validateGameId(uint256 _gameId){
        require(_gameId >=0 && _gameId < numGames, "Game Not Found!");
        _;
    }

    modifier authenticatePlayer(address _playerId){
        require(players[_playerId].isRegistered == true, "This user is not registered!");
        _;
    }

    modifier sufficientCredit(uint256 fee){
        require(players[msg.sender].credit >= fee, "Unsufficeint credit for this action!");
        _;
    }

    modifier gameNotCreatedByUser(uint256 _gameId){
        require(msg.sender != games[_gameId].creator, "Unathourized action on your own game!");
        _;
    }

    modifier gameCreatedByUser(uint256 _gameId){
        require(msg.sender == games[_gameId].creator, "Unathourized action on a game that is not created by you!");
        _;
    }

    modifier gameIsComplete(uint256 _gameId){
        require(games[_gameId].isComplete == true , "Game Not Ready!");
        _;
    }


    function registerPlayer() external payable {
        require(players[msg.sender].isRegistered == false, "This user has already been registered!");

        players[msg.sender].isRegistered = true;
        players[msg.sender].credit = INITIAL_CREDIT;

        emit PlayerRegistered(msg.sender);
    }


    function getPlayer() external view authenticatePlayer(msg.sender) returns(address, uint256, uint256[] memory, uint256[] memory){
        return (
            msg.sender,
            players[msg.sender].credit,
            players[msg.sender].createdGames,
            players[msg.sender].purchasedGames
        );
    }


    // input example: "Game Title", "Game Description", 1, 10, "https://livlo.co.uk/file/2019/06/486900232-1.jpg"
    function createGameInfo(string memory _title, string memory _description, uint256 _price, uint8 _numQuestions, string memory _thumbnails) public payable authenticatePlayer(msg.sender) sufficientCredit(GAME_CREATION_FEE) {
        require(_numQuestions <= MAX_QUESTIONS_COUNT && _numQuestions >= MIN_QUESTIONS_COUNT, "Each game should have at least 10 and at most 100 questions");
        require(_price>=0 && _price <= 10, "game price should be between 0 t0 10!");

        uint256 gameId = numGames++;

        Game storage newGame = games[gameId];
        newGame.id = gameId;
        newGame.details.title = _title;
        newGame.details.description = _description;
        newGame.details.price = _price;
        newGame.details.numQuestions = _numQuestions;
        newGame.details.thumbnails = _thumbnails;
        newGame.creator = msg.sender;

        players[msg.sender].createdGames.push(gameId);
        players[msg.sender].gameStats[gameId].isCreator = true;
        players[msg.sender].credit -= GAME_CREATION_FEE;

        emit GameInfoAdded(msg.sender, gameId);
    }


    // input example: 0,[["q","a","w1","w2","w3"],["q","a","w1","w2","w3"],["q","a","w1","w2","w3"],["q","a","w1","w2","w3"],["q","a","w1","w2","w3"],["q","a","w1","w2","w3"],["q","a","w1","w2","w3"],["q","a","w1","w2","w3"],["q","a","w1","w2","w3"],["q","a","w1","w2","w3"]]
    function createGameQusetions(uint256 _gameId, Question[] memory _gameQuestions) public payable authenticatePlayer(msg.sender) gameCreatedByUser(_gameId) {
        uint8 numQuestion = games[_gameId].details.numQuestions;
        require(_gameQuestions.length == numQuestion, "Number of questions passed should be equal to the number of questions specified in the game creation!");

        Game storage game = games[_gameId];

        for (uint8 i=0; i<numQuestion; i++){
            Question storage question = game.questions[i];
            question.context = _gameQuestions[i].context;
            question.answer = _gameQuestions[i].answer;
            question.wrongOption_1 = _gameQuestions[i].wrongOption_1;
            question.wrongOption_2 = _gameQuestions[i].wrongOption_2;
            question.wrongOption_3 = _gameQuestions[i].wrongOption_3;

        }

        game.isComplete = true;

        emit GameCreated(_gameId);
    }


    function getGameInfo(uint256 _gameId) external view authenticatePlayer(msg.sender) validateGameId(_gameId) returns(GameDetails memory, GameStats memory, PlayerGameStats memory){
        require(games[_gameId].isComplete == true || games[_gameId].creator == msg.sender, "Game Not found!");
        GameDetails memory details = GameDetails({
            title: games[_gameId].details.title,
            description: games[_gameId].details.description,
            price: games[_gameId].details.price,
            numQuestions: games[_gameId].details.numQuestions,
            thumbnails: games[_gameId].details.thumbnails
        });

        GameStats memory stats = GameStats({
            numBuyers: games[_gameId].stats.numBuyers,
            rating: games[_gameId].stats.rating,
            numRaters: games[_gameId].stats.numRaters
        });

        PlayerGameStats memory playerStats = PlayerGameStats({
            isCreator: players[msg.sender].gameStats[_gameId].isCreator,
            isPurchased: players[msg.sender].gameStats[_gameId].isPurchased,
            highscore: players[msg.sender].gameStats[_gameId].highscore,
            rating: players[msg.sender].gameStats[_gameId].rating
        });

        return (
            details,
            stats,
            playerStats
        );
    }


    function getGameQuestions(uint256 _gameId) external view authenticatePlayer(msg.sender) validateGameId(_gameId) gameIsComplete(_gameId) returns(uint8, Question[MAX_QUESTIONS_COUNT] memory){
        require(players[msg.sender].gameStats[_gameId].isPurchased == true || games[_gameId].creator == msg.sender, "This player has not access to this game!");

        Question[MAX_QUESTIONS_COUNT] memory gameQuestions;
        Game storage game = games[_gameId];

        for(uint8 i=0; i<uint8(game.details.numQuestions); i++){
            gameQuestions[i].context = game.questions[i].context;
            gameQuestions[i].answer = game.questions[i].answer;
            gameQuestions[i].wrongOption_1 = game.questions[i].wrongOption_1;
            gameQuestions[i].wrongOption_2 = game.questions[i].wrongOption_2;
            gameQuestions[i].wrongOption_3 = game.questions[i].wrongOption_3;
        }
        return (game.details.numQuestions, gameQuestions);
    }


    function purchase(uint256 _gameId) external payable authenticatePlayer(msg.sender) validateGameId(_gameId) gameIsComplete(_gameId) gameNotCreatedByUser(_gameId) sufficientCredit(games[_gameId].details.price){
        require(players[msg.sender].gameStats[_gameId].isPurchased == false, "This player have already purchased this game!");

        players[msg.sender].purchasedGames.push(_gameId);
        players[msg.sender].gameStats[_gameId].isPurchased = true;
        players[msg.sender].credit -= games[_gameId].details.price;
        players[games[_gameId].creator].credit -= games[_gameId].details.price;

        games[_gameId].stats.numBuyers++;

        emit GamePurchased(msg.sender, _gameId);
    }



    function play(uint256 _gameId, uint8 score) external payable authenticatePlayer(msg.sender) validateGameId(_gameId) gameIsComplete(_gameId) gameNotCreatedByUser(_gameId){
        require(players[msg.sender].gameStats[_gameId].isPurchased == true, "This player did not purchase this game!");

        if (score > players[msg.sender].gameStats[_gameId].highscore){
            if (score >= FAIL_TRESHOLD){
                players[msg.sender].credit += (score - players[msg.sender].gameStats[_gameId].highscore) * GAME_BASE_REWARD;
                emit NewHighscore(msg.sender, _gameId, score);
            }
            players[msg.sender].gameStats[_gameId].highscore = score;
        } else if (score < FAIL_TRESHOLD){
            players[msg.sender].credit -= (FAIL_TRESHOLD - score) * GAME_BASE_REWARD;
        }
    }


    function getGamesCount() external view authenticatePlayer(msg.sender) returns(uint256) {
        return numGames;
    }


    function transferCredit(uint256 amount, address reciever) external payable authenticatePlayer(msg.sender) sufficientCredit(amount) {
        require(players[reciever].isRegistered == true, "The reciever is not registered!");
        require(amount > 0, "The transfer amount should be grater than 0 !");
        players[msg.sender].credit -= amount;
        players[reciever].credit +=amount;
    }


    // since we don't have floating point number here we are going to store rating between 0 to 100 and in the app we can show it as 0 to 10
    function rateGame(uint256 _gameId, uint8 rating) external payable authenticatePlayer(msg.sender) validateGameId(_gameId) gameIsComplete(_gameId) gameNotCreatedByUser(_gameId) {
        require(players[msg.sender].gameStats[_gameId].isPurchased == true, "This player did not purchase this game!");
        require(rating <= 100 && rating > 0, "rating number should be between 1 to 100!");

        players[msg.sender].gameStats[_gameId].rating = rating;
        games[_gameId].stats.rating = (rating + (games[_gameId].stats.rating * games[_gameId].stats.numRaters)) / (games[_gameId].stats.numRaters + 1);
        games[_gameId].stats.numRaters++;
    }
}
