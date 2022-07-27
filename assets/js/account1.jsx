// this keeps a running total of deposits and withdrawals

const ATMDeposit = ({ onChange }) => {
  return (
    <label className="label huge">
    {/* TODO: Change this to become dynamic, so if the amount is >0 ==> Deposit, else <0 ==> Withdraw */}
      Deposit:
      <input type="number" onChange={onChange}></input>
      <input type="submit"></input>
    </label>
  );
};

// Parent function Account (i.e. web component)
const Account = () => {
  const [accountState, setAccountState] = React.useState(0);
  var deposit = 0;
  const handleChange = event => {
    console.log(`handleChange ${event.target.value}`);
    // TODO: Add checking to ensure event.target.value is a number
    deposit = Number(event.target.value);
  };
  const handleSubmit = event => {
    let newTotal = accountState + deposit;
    // TODO: Add currency format to the output:
    alert(`Account total = ${newTotal}`);
    setAccountState(newTotal);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
    {/* Account balance variable is stored in accountState */}
      <h2>Account Balance {accountState}</h2>
      <ATMDeposit onChange={handleChange}> Deposit</ATMDeposit>
    </form>
  );
};
// ========================================
// Add the form Account to the root
ReactDOM.render(<Account />, document.getElementById("root"));
