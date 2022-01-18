pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
  string public name = "EthSwap Instant Exchange";
  Token public token;
  uint public rate = 100;

  event TokensPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor(Token _token) public {
    token = _token;
  }

  function buyTokens() public payable {
    // calculate the number of tokens to buy
    uint tokenAmount = msg.value * rate;

    // require that EthSwap has enough tokens
    require(token.balanceOf(address(this)) >= tokenAmount);

    // transfer tokens to user
    token.transfer(msg.sender, tokenAmount);

    // emit an event
    emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
  }

  function sellTokens(uint _amount) public {

    // calculate the amount of Ether to redeem
    uint etherAmount = _amount / rate;

    // user can't sell more tokens than they have
    require(token.balanceOf(msg.sender) >= _amount);

    // Require that EthSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    token.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    // emit an event
    emit TokensSold(msg.sender, address(token), _amount, rate);
  }
  event TokensSold(
    address account,
    address token,
    uint amount,
    uint rate
  );
}
