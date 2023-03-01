import React, { useState } from "react";
import BubbleComponent from "./components/BubbleComponent";
function App() {
  const [data, setData] = useState({
    name: "vis",
    children: [
      {
        name: "全部",
        children: [
          { name: "应用系统全称", grade: "A", importance: "特别重要" },
          { name: "应用系统全称", grade: "B", importance: "特别重要" },
          { name: "应用系统全称", grade: "C", importance: "一般" },
          { name: "应用系统全称", grade: "D", importance: "重要" },
          { name: "应用系统全称", grade: "A", importance: "不重要" },
          { name: "应用系统全称", grade: "B", importance: "特别重要" },
          { name: "应用系统全称", grade: "C", importance: "一般" },
          { name: "应用系统全称", grade: "D", importance: "重要" },
          { name: "应用系统全称", grade: "D", importance: "不重要" },
          { name: "应用系统全称", grade: "D", importance: "特别重要" },
          { name: "应用系统全称", grade: "D", importance: "一般" },
          { name: "应用系统全称", grade: "D", importance: "重要" },
          { name: "应用系统全称", grade: "D", importance: "不重要" },
          { name: "应用系统全称", grade: "D", importance: "特别重要" },
          { name: "应用系统全称", grade: "D", importance: "一般" },
          { name: "应用系统全称", grade: "D", importance: "重要" },
          { name: "应用系统全称", grade: "A", importance: "不重要" },
          { name: "应用系统全称", grade: "B", importance: "特别重要" },
          { name: "应用系统全称", grade: "B", importance: "一般" },
          { name: "应用系统全称", grade: "B", importance: "重要" },
          { name: "应用系统全称", grade: "B", importance: "不重要" },
          { name: "应用系统全称", grade: "B", importance: "特别重要" },
          { name: "应用系统全称", grade: "B", importance: "一般" },
          { name: "应用系统全称", grade: "B", importance: "重要" },
          { name: "应用系统全称", grade: "B", importance: "不重要" },
          { name: "应用系统全称", grade: "B", importance: "特别重要" },
          { name: "应用系统全称", grade: "B", importance: "一般" },
          { name: "应用系统全称", grade: "B", importance: "重要" },
          { name: "应用系统全称", grade: "C", importance: "重要" },
        ],
      },
    ],
  });
  return (
    <div>
      <BubbleComponent data={data} />
    </div>
  );
}

export default App;
