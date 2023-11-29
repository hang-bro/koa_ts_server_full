import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Counter() {
  const navigate = useNavigate()
  const [count, setCount] = useState(0);
  return (
    <main>
      {count}
      <Button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        +1
      </Button>
      <Button
        onClick={() => {
          navigate('/test1')

        }}
      >
        test1
      </Button>
    </main>
  )
}


export default Counter