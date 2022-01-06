//// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

/// @title Basic contract that allows you to create custom keyboards and store the information in the blockchain
/// @author Kevin Bravo (@BKevTo)
/// @notice Allows people to register keyboards while the ownership of the information are given to them. Can tip keyboards the you like. The protocol Owner (me) earn 1% of every tip made to whatever contract
contract Keyboards {
    enum KeyboardKind {
        SixtyPercent,
        SeventyFivePercent,
        EightyPercent,
        Iso105
    }

    event KeyboardCreated(
        Keyboard keyboard
    );
    event TipSent(
        address recipient,
        uint256 amount
    );

    address public protocolOwner;
    constructor(){
        protocolOwner = msg.sender;
    }

    struct Keyboard {
        KeyboardKind kind;
        bool isPBT;
        string filter;
        address payable owner;
    }

    Keyboard[] public createdKeyboards;

    function getKeyboards() public view returns (Keyboard[] memory) {
        return createdKeyboards;
    }

    function createKeyboard(
        KeyboardKind _kind,
        bool _isPBT,
        string calldata _filter
    ) external {
        Keyboard memory newKeyboard = Keyboard({
            kind: _kind,
            isPBT: _isPBT,
            filter: _filter,
            owner: payable(msg.sender)
        });

        createdKeyboards.push(newKeyboard);
        emit KeyboardCreated(newKeyboard);
    }

    function tip(uint256 _index) external payable {
        uint256 value = _getPercentage(msg.value);

        address payable keyboardOwner = createdKeyboards[_index].owner;

        (bool success, ) = payable(keyboardOwner).call{value: msg.value - value}("");
        require(success, "Failed to send owner Ether");

         emit TipSent(keyboardOwner, msg.value);

        (bool successII, ) = payable(protocolOwner).call{value: value}("");
        require(successII, "Failed to send owner protocol Ether");
    }

    /**@notice use to get a revenue of 1% for each contribution made */
    function _getPercentage(uint256 num) private pure returns (uint256) {
        return (num * 1) / 100;
    }
}
