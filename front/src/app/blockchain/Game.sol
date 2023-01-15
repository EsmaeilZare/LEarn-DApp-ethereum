// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract GameContract {
    uint8 private constant GAME_CREATION_FEE = 50;
    uint8 private constant GAME_BASE_REWARD = 1;
    uint8 private constant INITIAL_CREDIT = 100;
    uint8 private constant MIN_QUESTIONS_COUNT = 10;
    uint8 private constant MAX_QUESTIONS_COUNT = 100;
    uint8 private constant FAIL_TRESHOLD = 60;


    enum CorrectOption {
        First,
        Second,
        Third,
        Fourth
    }

    struct Question {
        string text;
        string[4] options;
        CorrectOption answer;
    }

    struct GameDetails {
        string title;
        string description;
        uint256 price;
        uint8 numQuestions;
        string thumbnail;
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
    event GameCreated(uint256 gameId);
    event GamePurchased(address playerId, uint256 gameId);
    event NewHighscore(address playerId, uint256 gameId, uint8 highscore);
    event GameRated(uint256 gameId);


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


    // input example: "title","description",1,10,"",[["q",["a","b","c","d"],1],["q",["a","b","c","d"],1],["q",["a","b","c","d"],1],["q",["a","b","c","d"],1],["q",["a","b","c","d"],1],["q",["a","b","c","d"],1],["q",["a","b","c","d"],1],["q",["a","b","c","d"],1],["q",["a","b","c","d"],1],["q",["a","b","c","d"],1]]
    function createGame(string memory _title, string memory _description, uint256 _price, uint8 _numQuestions, string memory _thumbnail, Question[] memory _gameQuestions) public payable authenticatePlayer(msg.sender) sufficientCredit(GAME_CREATION_FEE) {
        require(_numQuestions <= MAX_QUESTIONS_COUNT && _numQuestions >= MIN_QUESTIONS_COUNT, "Each game should have at least 10 and at most 100 questions");
        require(_price>=0 && _price <= 10, "game price should be between 0 t0 10!");
        require(_gameQuestions.length == _numQuestions, "Number of questions passed should be equal to the number of questions specified in the game creation!");

        uint256 gameId = numGames++;

        Game storage newGame = games[gameId];
        newGame.id = gameId;
        newGame.details.title = _title;
        newGame.details.description = _description;
        newGame.details.price = _price;
        newGame.details.numQuestions = _numQuestions;
        newGame.details.thumbnail = _thumbnail;
        newGame.creator = msg.sender;

        for (uint8 i=0; i<_numQuestions; i++){
            Question storage question = newGame.questions[i];
            question.text = _gameQuestions[i].text;
            question.options[0] = _gameQuestions[i].options[0];
            question.options[1] = _gameQuestions[i].options[1];
            question.options[2] = _gameQuestions[i].options[2];
            question.options[3] = _gameQuestions[i].options[3];
            question.answer = _gameQuestions[i].answer;
        }

        players[msg.sender].createdGames.push(gameId);
        players[msg.sender].gameStats[gameId].isCreator = true;
        players[msg.sender].credit -= GAME_CREATION_FEE;

        emit GameCreated(gameId);
    }


    function getGameInfo(uint256 _gameId) external view authenticatePlayer(msg.sender) validateGameId(_gameId) returns(GameDetails memory, GameStats memory, PlayerGameStats memory){
        GameDetails memory details = GameDetails({
            title: games[_gameId].details.title,
            description: games[_gameId].details.description,
            price: games[_gameId].details.price,
            numQuestions: games[_gameId].details.numQuestions,
            thumbnail: games[_gameId].details.thumbnail
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


    function getGameQuestions(uint256 _gameId) external view authenticatePlayer(msg.sender) validateGameId(_gameId) returns(uint8, Question[MAX_QUESTIONS_COUNT] memory){
        require(players[msg.sender].gameStats[_gameId].isPurchased == true || games[_gameId].creator == msg.sender, "This player has not access to this game!");

        Question[MAX_QUESTIONS_COUNT] memory gameQuestions;
        Game storage game = games[_gameId];

        for(uint8 i=0; i<uint8(game.details.numQuestions); i++){
            gameQuestions[i].text = game.questions[i].text;
            gameQuestions[i].options = game.questions[i].options;
            gameQuestions[i].answer = game.questions[i].answer;
        }
        return (game.details.numQuestions, gameQuestions);
    }


    function purchase(uint256 _gameId) external payable authenticatePlayer(msg.sender) validateGameId(_gameId) gameNotCreatedByUser(_gameId) sufficientCredit(games[_gameId].details.price){
        require(players[msg.sender].gameStats[_gameId].isPurchased == false, "This player have already purchased this game!");

        players[msg.sender].purchasedGames.push(_gameId);
        players[msg.sender].gameStats[_gameId].isPurchased = true;
        players[msg.sender].credit -= games[_gameId].details.price;
        players[games[_gameId].creator].credit -= games[_gameId].details.price;

        games[_gameId].stats.numBuyers++;

        emit GamePurchased(msg.sender, _gameId);
    }



    function play(uint256 _gameId, uint8 score) external payable authenticatePlayer(msg.sender) validateGameId(_gameId) gameNotCreatedByUser(_gameId){
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
    function rateGame(uint256 _gameId, uint8 _rating) external payable authenticatePlayer(msg.sender) validateGameId(_gameId) gameNotCreatedByUser(_gameId) {
        require(players[msg.sender].gameStats[_gameId].isPurchased == true, "This player did not purchase this game!");
        require(_rating <= 100 && _rating > 0, "rating number should be between 1 to 100!");

        players[msg.sender].gameStats[_gameId].rating = _rating;
        games[_gameId].stats.rating = (_rating + (games[_gameId].stats.rating * games[_gameId].stats.numRaters)) / (games[_gameId].stats.numRaters + 1);
        games[_gameId].stats.numRaters++;

        emit GameRated(_gameId);
    }
}
