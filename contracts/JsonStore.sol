pragma solidity ^ 0.4 .17;
contract JsonStore {
    string public value;

    function set(string _value) public {
        value = _value;
    }

    function get() public view returns(string) {
        return value;
    }


}