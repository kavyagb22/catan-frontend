// import Image from "next/image";
"use client";

import React, { useEffect, useState } from "react";
import style from "./page.module.css";
// import axios from "axios";
import Axios from "axios";

export default function Home() {
    const [boardData, setBoardData] = useState<any>([]);
    const [generated, setGenerated] = useState<boolean>(false);
    const hexes = [
        ["A", "B", "C"],
        ["D", "E", "F", "G"],
        ["H", "I", "J", "K", "L"],
        ["M", "N", "O", "P"],
        ["Q", "R", "S"],
    ];
    const colorScheme: any = {
        W: "green",
        L: "#517d19",
        B: "#9c4300",
        O: "#7b6f83",
        G: "#f0ad00",
        D: "black",
    };

    const pictureScheme: any = {
        W: "sheep.png",
        L: "forest.png",
        B: "brick.png",
        O: "mountain.png",
        G: "wheat.png",
        D: "desert.png",
    };
    const middleRow = (hexes.length + 1) / 2;

    const getBoardData = async () => {
        const result = await Axios.post("http://127.0.0.1:8000/board-setup", {
            number_of_players: 3,
        });
        console.log("result: ", result.data);
        setBoardData(result.data[0]);
        setGenerated(true);
    };

    const generateBoard = async () => {
        getBoardData();
    };

    useEffect(() => {
        // console.log("middle row", middleRow);
        // getBoardData();
        // console.log("board data: ", boardData);
    });
    return (
        <>
            <button onClick={generateBoard} style={{ color: "red" }}>
                Generate Board
            </button>
            {generated &&
                boardData.map((row: any, index: any) => (
                    <div
                        className={style.rowContainer}
                        // if it is the middle row, do not move it
                        style={{
                            marginLeft:
                                index + 1 === middleRow
                                    ? 0
                                    : // if is before the middle row, start moving left
                                    index + 1 < middleRow
                                    ? 50 * (middleRow - (index + 1))
                                    : 50 * (index + 1 - middleRow),
                            marginBottom:
                                index + 1 === middleRow
                                    ? 0
                                    : // if is before the middle row, start moving down
                                    index + 1 < middleRow
                                    ? -20
                                    : 0,
                            marginTop:
                                index + 1 === middleRow
                                    ? 0
                                    : index + 1 > middleRow
                                    ? -20
                                    : 0,
                        }}
                    >
                        {row.map((hex: any) => (
                            <>
                                <div
                                    className={style.hex}
                                    style={{
                                        // backgroundImage:
                                        //     colorScheme[hex.resource]
                                        backgroundImage: `url(${
                                            pictureScheme[hex.resource]
                                        })`,

                                        backgroundColor: `${
                                            colorScheme[hex.resource]
                                        }`,
                                        
                                    }}
                                >
                                    {console.log(
                                        "color",
                                        colorScheme["green"],
                                        colorScheme[hex.resource]
                                    )}
                                    <p>{hex.resource}</p>
                                    <p>{hex.dots_as_stars}</p>
                                </div>
                            </>
                        ))}
                    </div>
                ))}
        </>
    );
}
