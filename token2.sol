// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IVRC25 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title CrowEscrow
 * @dev A secure escrow contract for the AgriShop marketplace with token support
 */
contract CrowEscrow {
    // State variables
    address public buyer;
    address public seller;
    address public arbiter;
    address public token;
    uint256 public amount;
    uint256 public createdAt;
    bool public released;
    bool public refunded;
    bool public initialized;
    
    // Events
    event Deposited(address indexed buyer, address indexed seller, address indexed token, uint256 amount);
    event Released(address indexed seller, address indexed token, uint256 amount);
    event Refunded(address indexed buyer, address indexed token, uint256 amount);
    
    // Constructor - simplified to avoid token transfers during deployment
    constructor() {
        buyer = msg.sender;
        seller = 0x8688b551Aa46BdD98d5Cab7Be209bb03cf67E1B6;
        arbiter = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
        token = 0xA8969282D4e2Aa5ff588B9087059AADF333b71db;
        createdAt = block.timestamp;
        released = false;
        refunded = false;
        initialized = false;
    }
    
    // Initialize function - call after deployment to deposit funds
    function initialize(uint256 _amount) external {
        require(msg.sender == buyer, "Only buyer can initialize");
        require(!initialized, "Already initialized");
        
        amount = _amount;
        initialized = true;
        
        // Transfer tokens from buyer to this contract
        require(
            IVRC25(token).transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );
        
        emit Deposited(buyer, seller, token, amount);
    }
    
    // Modifiers
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this function");
        _;
    }
    
    modifier onlySellerOrArbiter() {
        require(msg.sender == seller || msg.sender == arbiter, "Only seller or arbiter can call this function");
        _;
    }
    
    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only arbiter can call this function");
        _;
    }
    
    modifier isInitialized() {
        require(initialized, "Contract not initialized");
        _;
    }
    
    modifier notReleased() {
        require(!released, "Funds have already been released");
        _;
    }
    
    modifier notRefunded() {
        require(!refunded, "Funds have already been refunded");
        _;
    }
    
    // Functions
    function releaseFunds() public onlyBuyer isInitialized notReleased notRefunded {
        released = true;
        require(
            IVRC25(token).transfer(seller, amount),
            "Token transfer to seller failed"
        );
        emit Released(seller, token, amount);
    }
    
    function refundFunds() public onlySellerOrArbiter isInitialized notReleased notRefunded {
        refunded = true;
        require(
            IVRC25(token).transfer(buyer, amount),
            "Token transfer to buyer failed"
        );
        emit Refunded(buyer, token, amount);
    }
    
    // Auto-release after X days if not disputed
    function autoRelease() public isInitialized notReleased notRefunded {
        require(block.timestamp >= createdAt + 7 days, "Automatic release time not reached");
        released = true;
        require(
            IVRC25(token).transfer(seller, amount),
            "Token transfer to seller failed"
        );
        emit Released(seller, token, amount);
    }
    
    // Get the current balance of tokens in the contract
    function getBalance() public view returns (uint256) {
        return IVRC25(token).balanceOf(address(this));
    }
    
    // Check if contract is initialized
    function isActive() public view returns (bool) {
        return initialized && !released && !refunded;
    }
}