// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract GameContract {
    uint8 private constant MAX_LEVEL = 3;
    uint256 private constant GAME_PURCHASE_FEE = 3;
    uint256 private constant GAME_CREATION_FEE = 50;
    uint256 private constant GAME_BASE_REWARD = 1;
    uint8 private constant CREATOR_NEXT_LEVEL = 255;
    uint256 private constant INITIAL_CREDIT = 100;

    struct Game {
        uint256 id;
        bytes32[] words;
        bytes32[] meanings;
        string[3] details; // guide: 0 ==> title, 1 ==> description, 2 ==> thumbnails
        address creator;
        uint256 winnersCount;
    }

    struct Player {
        address id;
        bool isRegistered;
        uint256 credit;
        uint256[] createdGames;
        uint256[] purchasedGames;
        mapping(uint256 => uint8) nextLevelMap; // 0 if player didn't purchased it yet, 255 if the game was created by this player
    }

    Game[] games;
    mapping(address => Player) private players;

    event PlayerRegistered(address _playerId);
    event GameCreated(uint256 _gameId);
    event GamePurchased(uint256 _gameId, address _playerId);
    event GameLevelCleared(uint256 _gameId, address _playerId, uint8 _nextLevel);


    modifier validateGameId(uint256 _gameId){
        require(_gameId >=0 && _gameId < games.length, "Game Not Found!");
        _;
    }

    modifier authenticatePlayer(address _playerId){
        require(players[_playerId].isRegistered == true, "This user is not registered!");
        _;
    }

    modifier checkCredit(uint256 fee){
        require(players[msg.sender].credit >= fee, "Unsufficeint credit for this action!");
        _;
    }

    modifier checkCreator(uint256 _gameId){
        require(msg.sender != games[_gameId].creator, "Unathourized action on this game!");
        _;
    }


    function registerPlayer() external payable {
        require(players[msg.sender].isRegistered == false, "This user has already been registered!");

        players[msg.sender].isRegistered = true;
        players[msg.sender].credit = INITIAL_CREDIT;

        emit PlayerRegistered(msg.sender);
    }


    function getPlayer() external view authenticatePlayer(msg.sender) returns(address, uint256, uint256[] memory, uint256[] memory, uint8[] memory){
        uint256 purchasedGamesCount = players[msg.sender].purchasedGames.length;
        uint8[] memory purchasedGamesNextLevel = new uint8[](purchasedGamesCount);
        uint8 nextLevel;

        for (uint i=0; i<purchasedGamesCount; i++) {
            nextLevel = players[msg.sender].nextLevelMap[players[msg.sender].purchasedGames[i]];
            purchasedGamesNextLevel[i] = nextLevel;
        }

        return (
            players[msg.sender].id,
            players[msg.sender].credit,
            players[msg.sender].createdGames,
            players[msg.sender].purchasedGames,
            purchasedGamesNextLevel
        );
    }


    // example of byte32 => "0x0000000000000000000000000000000000000000000000000000006d6168616d"
    // above function input example: ["0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d"],["0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d"],["game1", "this game is good", "https://images.app.goo.gl/gH2ksczK8hqhVUweA"]

    function createGame(bytes32[] memory _words, bytes32[] memory _meanings, string[3] memory _details) public payable authenticatePlayer(msg.sender) checkCredit(GAME_CREATION_FEE) {
        require(_words.length <= 100 && _words.length >= 10, "Each word game should have at least 10 and at most 100 words");
        require(_words.length == _meanings.length, "size of words and their meanings are not the same!");

        uint256 gameId = games.length;
        Game memory newGame = Game({
            id: gameId,
            words: _words,
            meanings: _meanings,
            details: _details,
            creator: msg.sender,
            winnersCount: 0
        });
        games.push(newGame);

        players[msg.sender].createdGames.push(gameId);
        players[msg.sender].nextLevelMap[gameId] = CREATOR_NEXT_LEVEL;
        players[msg.sender].credit -= GAME_CREATION_FEE;

        emit GameCreated(gameId);
    }

    function getGame(uint256 _gameId) external view authenticatePlayer(msg.sender) validateGameId(_gameId) returns(uint256, bytes32[] memory, bytes32[] memory, string[3] memory, uint256, uint8){
        return (
            games[_gameId].id,
            games[_gameId].words,
            games[_gameId].meanings,
            games[_gameId].details,
            games[_gameId].winnersCount,
            players[msg.sender].nextLevelMap[_gameId]
        );
    }

    function purchase(uint256 _gameId) external payable authenticatePlayer(msg.sender) validateGameId(_gameId) checkCreator(_gameId) checkCredit(GAME_PURCHASE_FEE){
        require(players[msg.sender].nextLevelMap[_gameId] == 0, "This player have already purchased this game!");

        players[msg.sender].purchasedGames.push(_gameId);
        players[msg.sender].nextLevelMap[_gameId] = 1;
        players[msg.sender].credit -= GAME_PURCHASE_FEE;

        emit GamePurchased(_gameId, msg.sender);
    }

    // should we charge player if result of play was not successful?
    function play(uint256 _gameId, bool success) external payable authenticatePlayer(msg.sender) validateGameId(_gameId) checkCreator(_gameId){
        require(players[msg.sender].nextLevelMap[_gameId] > 0, "This player did not purchase this game!");
        require(players[msg.sender].nextLevelMap[_gameId] <= MAX_LEVEL, "This player has already completed this game!");

        if (success){
            players[msg.sender].credit += (players[msg.sender].nextLevelMap[_gameId]) * GAME_BASE_REWARD;
            players[msg.sender].nextLevelMap[_gameId] += 1;
            if (players[msg.sender].nextLevelMap[_gameId] > MAX_LEVEL){
                // Player has just finished the game
                games[_gameId].winnersCount += 1;
                players[games[_gameId].creator].credit += MAX_LEVEL * GAME_BASE_REWARD;
            }
            emit GameLevelCleared(_gameId, msg.sender, players[msg.sender].nextLevelMap[_gameId]);
        }
    }

    function getTotalGames() external view authenticatePlayer(msg.sender) returns(uint256) {
        return games.length;
    }
}
