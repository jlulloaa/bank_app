// It is better to move global variables and outer functions to a 
// web component (try to always avoid global variables in your code)
// let transactionState = 0; // state of this transaction
// let totalState = 0; // Account total at Bank
// let status = "Account Balance $zero";
// const handleChange = event => {
//   console.log(`handleChange ${event.target.value}`);
//   transactionState = Number(event.target.value);
// };
// const handleSubmit = event => {
//   totalState += transactionState;
//   status = `Account Balance $ ${totalState}`;
//   document.getElementById("total").innerHTML = status;
//   event.preventDefault();
// };

// (React web components start with a capital letter)
// After defining the Account web component, the ATMDeposit web component is moved inside the Account
const ATMDeposit = ({ onChange }) => {
//   let transactionState = 0; // state of this transaction
//   let totalState = 0; // Account total at Bank
//   let status = "Account Balance $zero";
//   const handleChange = event => {
//     console.log(`handleChange ${event.target.value}`);
//     transactionState = Number(event.target.value);
//   };
//   const handleSubmit = event => {
//     totalState += transactionState;
//     status = `Account Balance $ ${totalState}`;
//     document.getElementById("total").innerHTML = status;
//     event.preventDefault();
//   };
  return (
    <label className="label huge">
      Deposit:
      {/* After defining the Account web component, 
          the scope of handleChange cannot be accessed 
          via this ATMDeposit component, so it has to be passed
          via onChange (the input argument added to ATMDeposit) */}
      {/* <input type="number" onChange={handleChange}></input> */}
      <input type="number" onChange={onChange}></input>
      {/* Add  element value="submit" and remove onClick (why?)*/}
      {/* <input type="submit" onClick={handleSubmit}></input> */}
      <input type="submit" value="Submit"></input>
      {/* After adding Account, the following <h2> is no longer needed
          because ATMDeposit doesn't have access to "status" */}
      {/* <h2 id="total">{status}</h2> */}
    </label>
  );
};

// This web component simulates the bank, it keeps track of the money movements
const Account = () => {
  // Using global variables in React is wrong, so they need to be replaced:

  let transactionState = 0; // state of this transaction
  // Also, to avoid global variables, 
  // we keep track of the state by using the hook setStatus
  // let totalState = 0; // Account total at Bank
  const [totalState, setTotalState] = React.useState(0);
  let status = `Account Balance $ ${totalState}`;
  // The initalisation above occurrs only once at the beginning
  console.log('Account Rendered');
  // let status = `Account Balance $ ${totalState}`;
  const handleChange = event => {
    console.log(`handleChange ${event.target.value}`);
    transactionState = Number(event.target.value);
  };
  // handleSubmit doesn't need an event anymore
  // const handleSubmit = event => {
  const handleSubmit = () => {
    // Because we are now keep track of the state via React.setStatus, 
    // we don't need to increment the totalState
    // totalState += transactionState;
    setTotalState(totalState+transactionState);
    // the setTotalState call above will fire a re-rendering
    // so, the let status=`Account Balance $ ${totalState}`;
    // gets rewritten (see above)

    // To avoid affecting the DOM directly, 
    // move the status where it is defined in the first place (let status=)
    // status = `Account Balance $ ${totalState}`;
    // The following line affects directly the DOM, 
    // which is not correct within the React scheme 
    // (that's why it has the virtual/shadow DOM)
    // document.getElementById("total").innerHTML = status;
    // event is deprecated
    // event.preventDefault();
    preventDefault();
  };
// const [accountState, setAccountState] = React.useState(0);
//   const handleChange = event => {
//     console.log(`handleChange ${event.target.value}`);
//     setAccountState(event.target.value);
//   };
//   const handleSubmit = event => {
//     alert(`Account total = ${accountState}`);
//     event.preventDefault();
//   };
  return (
    <form onSubmit={handleSubmit}>
      {/* <h2>Account Balance {accountState}</h2> */}
      <h2 id='total'>{status}</h2>
      <ATMDeposit onChange={handleChange}> Deposit</ATMDeposit>
    </form>
  );
};
// ========================================
// Look at the definition of ATMPDeposit. It is a "functional component"
// ReactDOM.render(<ATMDeposit />, document.getElementById("root"));
// After defining the Account webcomponent, this becomes the main component to pass into the root element:
ReactDOM.render(<Account />, document.getElementById("root"));