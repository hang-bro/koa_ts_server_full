import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Counter() {
  // ✅ Good: top-level in a function component
  const [count, setCount] = useState(0);
  const navigate = useNavigate()
  // ...
  return (
    <main>
      {count}
      <Button
        onClick={() => {
          setCount(count + 1)
          navigate('/test2')
        }}
      >
        +1
      </Button>
    </main>
  )
}


export default Counter