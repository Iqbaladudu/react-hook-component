import React, { useState, useReducer, useCallback, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import Greeting from './GreetingFunctional'
import ListCreator, {ListItem, ListItems} from './ListCreator'

const reducer = (state: any, action: any) => {
  console.log("enteredNameReducer")
  switch(action.type) {
    case "enteredName":
      if(state.enteredName === action.payload) {
        return state
      }
      return {...state, enteredName: action.payload}
    case "message":
      console.log(state)
      console.log(action)
      return {...state, message: `Hallo, ${action.payload}`}
    default:
      throw new Error("Invalid action type " + action.type)
  }
}

const initialState = {
  enteredName: "",
  message: "",
}

function App() {
  const [{message, enteredName}, dispatch] = useReducer(reducer, initialState)

  const [startCount, setStartCount] = useState(0)
  const [count, setCount] = useState(0)
  const setCountCallback = useCallback(() => {
    const inc = count + 1 > startCount ? count + 1:
    Number(count + 1) + startCount;
    setCount(inc)
  }, [count, startCount])

  const [listItems, setListItems] = useState<Array<ListItem>>();
  useEffect(() => {
    const li = [];
    for(let i=0;i< count; i++) {
      li.push({id: i})
    }
    setListItems(li)
  }, [count])

  const onWelcomeBtnClick = () => {
    setCountCallback();
  }
  const onChangeStartCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartCount(Number(e.target.value))
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" className="App-logo" />
        <Greeting
        message={message}
        enteredName={enteredName}
        greetingDispatcher={dispatch} />
        <div style={{marginTop: '10px'}}>
          <label>Enter a number and we'll increment it</label>
          <br />
          <input value={startCount} onChange={onChangeStartCount} style={{width: '1rem'}} />&nbsp;
          <label>{count}</label>
          <br />
          <button onClick={onWelcomeBtnClick}>
            Increment count
          </button>
        </div>
        <div>
          <ListCreator listItems={listItems}/>
        </div>
      </header>
    </div>
  )
}


// class App extends React.Component {
//   constructor(props: any) {
//     super(props)
//     this.state = {
//       enteredName: "",
//       message: ""
//     }
//     this.onChangeName = this.onChangeName.bind(this)
//   }
  
//   state: {enteredName: string, message: string}
  
//   onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
//     this.setState({
//       enteredName: e.target.value,
//       message: `Hello from, ${e.target.value}`
//     })
//   }

//   render() {
//     console.log("Rendering App...")
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} alt="logo" className="App-logo" />
//           <input value={this.state.enteredName}
//           onChange={this.onChangeName} />
//           <Greeting message={this.state.message} />
//         </header>
//       </div>
//     )
//   }
// }

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Greeting name="Irma Gustia" />
//       </header>
//     </div>
//   )
// }

export default App
