// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract GameContract {
    uint8 public constant MAX_LEVEL = 3;

    struct Game {
        uint256 id;
        bytes32[] words;
        bytes32[] meanings;
        string thumbnails;
        address creator; 
    }

    struct Player {
        address id;
        uint256 credit;
        uint256[] purchasedGames;
        mapping(uint256 => PlayerGameRecord) playHistoryMap;
    }

    struct PlayerGameRecord {
        address playerId;
        uint256 gameId;
        uint8 nextLevel; // each game has 3 levels {easy, normal, hard}
    }

    Game[] games;
    mapping(address => Player) private players;

    function createGame(bytes32[] memory _words, bytes32[] memory _meanings, string memory _thumb) public payable{
        require(_words.length <= 100 && _words.length >= 10, "Each word game should have at least 10 and at most 100 words");
        require(_words.length == _meanings.length, "size of words and their meanings are not the same!");

        uint256 gameId = games.length;
        // for (uint i=0; i<_words.length; i++) {
        //     wordMap[_words[i]].push(_meanings[i]);
        // }

        Game memory newGame = Game({
            id: gameId,
            words: _words,
            meanings: _meanings,
            thumbnails: _thumb,
            creator: msg.sender
        });

        games.push(newGame);
    }

    // example of byte32 => "0x0000000000000000000000000000000000000000000000000000006d6168616d"
    // above function input example: ["0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d"],["0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d","0x0000000000000000000000000000000000000000000000000000006d6168616d"],"khar"

    modifier validateGameId(uint256 _gameId){
        require(_gameId >=0 && _gameId < games.length, "Word Game Not Found!");
        _;
    }

    function getGame(uint256 _gameId) external view validateGameId(_gameId) returns(uint256, bytes32[] memory, bytes32[] memory, string memory) {
        // TODO: we should return if the user calling this function has already purchased this game and if yes what is his next level?
        return (
            games[_gameId].id,
            games[_gameId].words,
            games[_gameId].meanings,
            games[_gameId].thumbnails
        );
    }

    function purchase(uint256 _gameId) external payable validateGameId(_gameId) returns(uint256){
        require(players[msg.sender].playHistoryMap[_gameId].nextLevel == 0, "This player have already purchased this game!");

        // TODO: charge player and pay owner

        PlayerGameRecord memory pgr = PlayerGameRecord({
            playerId: msg.sender,
            gameId: _gameId,
            nextLevel: 1
        });

        players[msg.sender].playHistoryMap[_gameId] = pgr;

        return _gameId;
    }

    // should we charge player if result of play was not successful?
    function play(uint256 _gameId, bool success) external payable validateGameId(_gameId) {
        require(players[msg.sender].playHistoryMap[_gameId].nextLevel > 0, "This player did not purchase this game!");
        require(players[msg.sender].playHistoryMap[_gameId].nextLevel <= MAX_LEVEL, "This player has already completed this game!");

        if (success){
            players[msg.sender].playHistoryMap[_gameId].nextLevel += 1;
        }
    }
}