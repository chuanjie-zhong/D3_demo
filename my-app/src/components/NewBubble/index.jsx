import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { ZoomOutOutlined, ZoomInOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { text } from "d3";
window.d3 = d3;

function NewBubble({ data }) {
  const [width, setWidth] = useState("900");
  const [height, setHeight] = useState("900");
  const graphEl = useRef(null);
  const graphEls = useRef(null);
  const color = d3
    .scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);
  const pack = (data) => {
    console.log(data, width, height);
    return d3.pack().size([width, height]).padding(3)(
      d3
        .hierarchy(data)
        .sum((d) => {
          //   console.log(d);
          switch (d?.importance) {
            case "特别重要":
              return 8000;
            case "重要":
              return 6000;
            case "一般":
              return 4000;
            case "不重要":
              return 2000;

            default:
              break;
          }
        })
        .sort((a, b) => {
          console.log(a, b, "a-b");
          return a.data.grade - b.data.grade;
        })
    );
  };
  const format = d3.format(",d");

  useEffect(() => {
    if (graphEl.current) {
      console.log(
        graphEl.current.offsetHeight,
        graphEl.current.offsetWidth,
        "graphEl.current"
      );
      renderGraph();
    }
  }, [graphEl.current]);

  function replaceContainer() {
    let newNode = document.createElement("div");
    newNode.id = "container";
    newNode.onContextMenu = (e) => e.preventDefault();
    let old = document.querySelector("#container");
    old.parentElement.replaceChild(newNode, old);
  }
  function createLinearGradient(startColor, endColor, svg) {
    let gradientId = "gradient-" + startColor + "-" + endColor;
    let gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", gradientId)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", startColor);

    gradient.append("stop").attr("offset", "100%").attr("stop-color", endColor);

    return gradientId;
  }
  function renderGraph() {
    replaceContainer();
    const root = pack(data);
    let focus = root;
    console.log(root, "rootroot");
    let view;
    const _graphEl = document.getElementById("container");
    // const svg = d3
    //   .select("#container")
    //   .append("svg")
    //   .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
    //   .style("display", "block")
    //   .style("margin", "0 -14px")
    //   .style("background", color(0))
    //   .style("cursor", "pointer")
    //   .on("click", (event) => {
    //     console.log(event, root, "zcjsadasdadasdad");
    //     return zoom(event, root);
    //   });
    const zoom = () => {
      console.log("走动");
      return d3.zoom().on("zoom", function () {
        console.log(d3.event.transform);
        if (graphEls) {
          graphEls.current = {
            graphEls: d3.event.transform.k,
          };
        }
        svg.attr(
          "transform",
          d3.zoomIdentity
            .scale(d3.event.transform.k)
            .translate(d3.event.transform.x, d3.event.transform.y)
        );
      });
    };
    const container = d3.select("#container");
    let svg = container
      .append("svg")
      .attr(
        "viewBox",
        `-${_graphEl.offsetWidth / 2} -${_graphEl.offsetHeight / 2} ${
          _graphEl.offsetWidth
        } ${_graphEl.offsetHeight}`
      )
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("background", "#fff")
      .style("cursor", "pointer")
      .on("click", (event) => {
        console.log(d3.event, root, "zcjsadasdadasdad");
        // return zoom(d3.event, root);
      })
      .call(zoom());
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("id", (d, i) => {
        if (d.data.ids == "one") {
          return "allCirle-" + i;
        }
        return "circle-" + (i - data.children.length);
      })
      .attr("fill", (d) => (d.children ? color(d.depth) : "white"))
      .attr("pointer-events", (d) => (!d.children ? "none" : null))
      .attr("stroke-width", "0.1px")
      .attr("fill", (d) => {
        console.log(d, "d");
        if (d.children) {
          return color(d.depth);
        }
        //筛选后为灰色
        if (d?.data.gray) {
          return `url(#${createLinearGradient("#e9e9e9", "#e9e9e9", svg)})`;
        } else {
        }
        switch (d?.data?.grade) {
          case "1":
            return `url(#${createLinearGradient("#FF7657", "#FF0B0B", svg)})`;
          case "2":
            return `url(#${createLinearGradient("#FCB641", "#FF8C20", svg)})`;
          case "3":
            return `url(#${createLinearGradient("#33B0FF", "#2176FF", svg)})`;
          case "4":
            return `url(#${createLinearGradient("#47C8C4", "#4AC385", svg)})`;

          default:
            return "white";
        }
      })
      .on("mouseover", function () {
        d3.select(this).attr("stroke", "#000");
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", null);
      })
      .on("click", (event, d) => {
        // zoomTo([root.x, root.y, root.r * 1]);
      });
    let scale = d3.scaleLinear().domain([0, 100]).range([0, 200]);
    const label = svg
      .append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("foreignObject")
      //   .selectAll("text")
      .data(root.descendants())
      .join("foreignObject")
      //   .join("text")
      .attr("id", (d, i) => {
        if (d.data.ids == "one") {
          return "allText-" + i;
        }
        return "text-" + (i - data.children.length);
      })
      .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
      .style("display", (d) => (d.parent === root ? "inline" : "none"))

      //   .text((d) => {
      //     return <foreignObject>{d.data.name}</foreignObject>;
      //   })
      .html((d) => {
        if (d.data.ids == "one") {
          return `<div style=width:90px;height:26px;background:#e9e9e9;color:#000;display:flex;justify-content:center;align-items:center>${d.data.name}</div>`;
        }
        return `<div style=width:90px;background:transproty;color:#000;display:flex;justify-content:center;align-items:center;flex-direction:column>
            <p>${d.data.name[0]}</p>
            <p>告警</p>
          </div>`;
      })
      .attr("x", (d) => {
        if (d.data.ids == "one") {
          return -44;
        }
        return -44;
      })
      .attr("y", "-15")
      .style("width", "96px")
      .style("height", "56px")
      //   .text((d) => {
      //     return d.data.name;
      //   })
      .style("display", (d) => {
        if (d.data.name == "vis") {
          return "none";
        }
        return "block";
      });
    //   .append("tspan")
    //   .text((d) => 123);

    zoomTo([root.x, root.y, root.r * 2]);
    for (let i = 0; i < data.children.length; i++) {
      console.log(i, "ip");
      d3.select(`#allText-${i + 1}`).attr("y", (d) => {
        if (d.data.ids == "one") {
          //   const r = d3.select(`#allCirle-${i}`).attr("r");
          const r = d3.select(`#allCirle-${i}`).node()?.getAttribute("r");
          return -r - 17;
        }
      });
    }
    // label.attr("y", (d) => {
    //   // console.log(data.children.length, "dddddddddddddddddddd");
    //   let allr;
    //   for (let i = 0; i < data.children.length; i++) {
    //     if (d.data.ids == "one") {
    //       //   const r = d3.select(`#allCirle-${i}`).attr("r");
    //       const r = d3.select(`#allCirle-${i}`).node()?.getAttribute("r");
    //       console.log(
    //         i,
    //         d3.select(`#allCirle-${i}`).node()?.getAttribute("r"),
    //         "ip"
    //       );
    //       allr = -r;
    //       break;
    //     }
    //   }
    //   return allr;
    //   //   if (d.data.ids == "one") {
    //   //     return "-200";
    //   //   }
    //   // return "50";
    // });

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
    d3.select("#zoomOut").on("click", function () {
      zoom().scaleBy(svg, 1.1);
    });
    d3.select("#zoomIn").on("click", function () {
      zoom().scaleBy(svg, 0.9);
    });
    d3.select("#reust").on("click", function () {
      svg.call(zoom().transform, d3.zoomIdentity);
    });
  }

  return (
    <div style={{ position: "relative" }}>
      <div id="container" ref={graphEl}></div>
      <div
        style={{
          position: "absolute",
          width: 150,
          height: 36,
          top: 20,
          right: 20,
          border: "1px solid #e2e2e2",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          fontSize: "24px",
          borderRadius: 5,
        }}
      >
        <Button type="primary" id="reust">
          复原
        </Button>
        <ZoomInOutlined
          style={{ cursor: "pointer", fontSize: 16 }}
          id="zoomOut"
        />
        <ZoomOutOutlined
          style={{ cursor: "pointer", fontSize: 16 }}
          id="zoomIn"
        />
      </div>
    </div>
  );
}

export default NewBubble;
