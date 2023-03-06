import React, { useState } from "react";
import BubbleComponent from "./components/BubbleComponent";
import NewBubble from "./components/NewBubble";
function App() {
  const [data, setData] = useState({
    name: "vis",
    ids: "one",
    children: [
      {
        name: "全部",
        ids: "one",
        children: [
          {
            name: "应用系统全称",
            grade: "3",
            importance: "一般",
            gray: false,
            number: 200,
          },
          { name: "应用系统全称", grade: "1", importance: "重要", gray: false },
          { name: "应用系统全称", grade: "2", importance: "不重要" },
          { name: "应用系统全称", grade: "3", importance: "特别重要" },
          { name: "应用系统全称", grade: "4", importance: "一般" },
          { name: "应用系统全称", grade: "1", importance: "重要" },
          { name: "应用系统全称", grade: "2", importance: "不重要" },
          { name: "应用系统全称", grade: "3", importance: "特别重要" },
          { name: "应用系统全称", grade: "4", importance: "一般" },
          { name: "应用系统全称", grade: "2", importance: "重要" },
          { name: "应用系统全称", grade: "4", importance: "不重要" },
          { name: "应用系统全称", grade: "3", importance: "特别重要" },
          { name: "应用系统全称", grade: "2", importance: "一般" },
          { name: "应用系统全称", grade: "1", importance: "重要" },
          { name: "应用系统全称", grade: "1", importance: "不重要" },
          { name: "应用系统全称", grade: "2", importance: "特别重要" },
          { name: "应用系统全称", grade: "1", importance: "一般" },
          { name: "应用系统全称", grade: "3", importance: "重要" },
          { name: "应用系统全称", grade: "4", importance: "不重要" },
          { name: "应用系统全称", grade: "2", importance: "特别重要" },
          { name: "应用系统全称", grade: "2", importance: "一般" },
          { name: "应用系统全称", grade: "3", importance: "重要" },
          { name: "应用系统全称", grade: "1", importance: "不重要" },
          { name: "应用系统全称", grade: "4", importance: "特别重要" },
          { name: "应用系统全称", grade: "2", importance: "一般" },
          { name: "应用系统全称", grade: "2", importance: "重要" },
          { name: "应用系统全称", grade: "1", importance: "重要" },
        ],
      },
      {
        name: "全部",
        ids: "one",
        children: [
          { name: "应用系统全称", grade: "1", importance: "重要" },
          { name: "应用系统全称", grade: "2", importance: "不重要" },
          { name: "应用系统全称", grade: "3", importance: "特别重要" },
          { name: "应用系统全称", grade: "4", importance: "一般" },
          { name: "应用系统全称", grade: "1", importance: "重要" },
          { name: "应用系统全称", grade: "2", importance: "重要" },
        ],
      },
    ],
  });
  // return <BubbleComponent data={data} />;
  return (
    <>
      {/* <BubbleComponent data={data} /> */}
      <NewBubble data={data} />
    </>
  );
}

export default App;
