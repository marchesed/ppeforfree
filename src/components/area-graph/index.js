import React from 'react';
import './style.css'
import data from "../../latest.json";

const dataSlice = data.slice(10, 20);

const max = Math.max.apply(Math, dataSlice.map(function(o) { return o.memberCount; }))
const min = Math.min.apply(Math, dataSlice.map(function(o) { return o.memberCount; }))

const nodes = dataSlice.map(point => {
  return { id: point.id, x: randomX(), y: randomY(), r:normalize(point.memberCount), fill: getFill(point.isPublic), text: point.name }
})

function normalize(num){
  return (((num-min)/(max-min))*100) + 10
}

function randomX() {
  return 100 + Math.random() * (getWidth() - 100);
}

function randomY() {
  return 100 + Math.random() * (getHeight() - 200);
}

function getFill(isPrivate){
  return isPrivate ? 'red' : 'green'
}

function getWidth(){
  return window.innerWidth*.8;
}

function getHeight(){
  return window.innerHeight*.8;
}

const links = [
  // { id: 1, source: nodes[0], target: nodes[1] },
  // { id: 2, source: nodes[1], target: nodes[2] },
  // { id: 3, source: nodes[2], target: nodes[0] }
];

const circles = nodes.map(node => {
  return (
    <g key={node.id}>
      <circle cx={node.x} cy={node.y} r={node.r} strokeWidth="2" stroke="black" fill={node.fill} />
      <text x={node.x} y={node.y} textAnchor="middle" stroke="#fff" strokeWidth="1px" dy=".5em">{node.text}</text>
    </g>
  )
})

const lines = links.map(link => {
  return (<line key={link.id} x1={link.source.x} y1={link.source.y} x2={link.target.x} y2={link.target.y} strokeWidth="2" stroke="#999" strokeOpacity="0.6"></line>)
})

function NodeGraph () {
  return (
    <svg className="center" width={getWidth()} height={getHeight()}>
      <rect width={getWidth()} height={getHeight()} rx={10} fill="#272b4d" />
      {lines}
      {circles}
    </svg>
  );
};

export default NodeGraph