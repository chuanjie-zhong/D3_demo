import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

function BubbleComponent({ data }) {
  const chartRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [number, setNumber] = useState(1);
  const [width, setWidth] = useState(932);
  const [height, setHeight] = useState(932);

  const pack = (data) =>
    d3.pack().size([width, height]).padding(10)(
      d3
        .hierarchy(data)
        .sum((d) => {
          switch (d?.importance) {
            case "特别重要":
              return 6000;
            case "重要":
              return 4000;
            case "一般":
              return 2000;
            case "不重要":
              return 1000;

            default:
              break;
          }
        })
        .sort((a, b) => {
          console.log(a, b, "a-b");
          return b.value - a.value;
        })
    );
  const color = d3
    .scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);
  useEffect(() => {
    createChart();
    console.log(d3, "11111111");
  }, []);

  window.addEventListener("wheel", function (event) {
    console.log("鼠标滚轮被滚动了！");
    console.log("滚动的距离是：" + event.deltaY);
    if (event?.deltaY > 0) {
      console.log(number, "numberddsasa");
      if (number <= 1) {
        return;
      }
      console.log(123098221121);
      let newNumber = number - 0.5;
      setNumber(newNumber);
    } else {
      if (number >= 2) {
        return;
      }
      console.log(123221121);
      let newNumber = number + 0.5;
      setNumber(newNumber);
    }
  });
  function createChart() {
    const root = pack(data);
    let focus = root;
    let view;
    const container = d3
      .select("#container")
      .call(d3.zoom().on("zoom", zoomed));
    const svg = container
      .append("svg")
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "1080px")
      .style("display", "block")
      .style("margin", "0 -14px")
      // .style("background", color(0))
      .style("cursor", "pointer");
    // .on("click", (event) => zoom(event, root));

    function zoomed() {
      svg.attr("transform", d3.event.transform);
    }

    // 创建渐变函数
    function createLinearGradient(startColor, endColor) {
      let gradientId = "gradient-" + startColor + "-" + endColor;
      let gradient = svg
        .append("defs")
        .append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", startColor);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", endColor);

      return gradientId;
    }
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("stroke", "#999999")
      .attr("id", function (d, i) {
        return "circle-" + i;
      })
      .attr("stroke-width", "0.1px")
      .attr("fill", (d) => {
        console.log(d, "d");
        if (d.children) {
          return color(d.depth);
        }
        switch (d?.data?.grade) {
          case "A":
            return `url(#${createLinearGradient("#FF7657", "#FF0B0B")})`;
          case "B":
            return `url(#${createLinearGradient("#FCB641", "#FF8C20")})`;
          case "C":
            return `url(#${createLinearGradient("#33B0FF", "#2176FF")})`;
          case "D":
            return `url(#${createLinearGradient("#47C8C4", "#4AC385")})`;

          default:
            return "white";
        }
      })
      // .attr("pointer-events", (d) => (!d.children ? "none" : null))
      .on("mouseover", function (d, i) {
        if (this?.id === "circle-0") {
          return;
        }
        console.log(i.r, d3.select(this).attr("r"), "i.r");
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", d3.select(this).attr("r") + 10);
      })
      .on("mouseout", function (d, i) {
        if (this?.id === "circle-0") {
          return;
        }
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", d3.select(this).attr("r"));
      });
    // .on(
    //   "click",
    //   (event, d) => focus !== d && (zoom(event, d), event.stopPropagation())
    // );

    const label = svg
      .append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      // .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
      .style("display", (d) => {
        if (d.parent === root) {
          return "inline";
        }
        return "inline";
      })
      .text((d) => {
        console.log("ddddddddddd", d, root.descendants());
        if (d.data.name === "vis") {
          return "";
        } else if (d.data.name === "controls") {
          return d.data.name;
        }
        return d.data.name[0];
      });

    zoomTo([root.x, root.y, root.r * 2]);

    function zoomTo(v) {
      const k = width / v[2];

      view = v;

      label.attr(
        "transform",
        (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
      );
      node.attr(
        "transform",
        (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
      );
      node.attr("r", (d) => d.r * k);
    }

    function zoom(event, d) {
      const focus0 = focus;

      focus = d;

      const transition = svg
        .transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", (d) => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return (t) => {
            console.log(t, i, "tttttttttttt");
            return zoomTo(i(t));
          };
        });

      label
        .filter(function (d) {
          return d.parent === focus || this.style.display === "none";
        })
        .transition(transition)
        // .style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
        .on("start", function (d) {
          console.log("startsssssssssssssss");
          if (d.parent === focus) this.style.display = "inline";
        })
        .on("end", function (d) {
          console.log("endddddddddd", d, focus);
          if (d.parent !== focus) this.style.display = "none";
        });
    }
  }
  return (
    <div>
      <div
        id="container"
        // style={{ transform: `scale(${number})` }}
        ref={chartRef}
      ></div>
    </div>
  );
}

export default BubbleComponent;
