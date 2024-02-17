

function App() {

  return (
    <div className="app">
      <div className="calculator">
        <div className="output">
          <div className="previous-operand text-xl font-light">35456*6516</div>
          <div className="current-operand text-4xl">65498761</div>
        </div>
        <div className="input">
          <button className="col-span-2">AC</button>
          <button>DEL</button>
          <button>/</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>*</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>+</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>-</button>
          <button>.</button>
          <button>0</button>
          <button className="col-span-2">=</button>
        </div>
      </div>
    </div>
  )
}

export default App
