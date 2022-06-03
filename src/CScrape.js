import React, { useEffect, useState } from "react";
import "./CScrape.css";

export default function CScrape() {
    // 0: url, 1: date
    let [Defense, changeDefense] = useState(["", ""]);
    let [Foreign, changeForeign] = useState(["", ""]);
    let [Commerce, changeCommerce] = useState(["", ""]);

    useEffect(() => {
        const fetchContents = async () => {
            try {
                // 국방부
                fetch("/jzhzt/node_47321.htm?q=proxy")
                    .then((response) => response.text())
                    .then((responseText) => {
                        //DOM scrape
                        const responseDoc = new DOMParser().parseFromString(
                            responseText,
                            "text/html"
                        );
                        const responseElement =
                            responseDoc.querySelector(".title");
                        //DOM read
                        var urlDefense =
                            "http://www.mod.gov.cn/jzhzt/" +
                            responseElement.innerHTML.split('"')[1];
                        var dateDefense = responseElement.textContent;
                        //change state
                        changeDefense([urlDefense, dateDefense]);
                    });

                //외교부
                fetch("/web/fyrbt_673021/?q=proxy")
                    .then((response) => response.text())
                    .then((responseText) => {
                        //DOM scrape
                        const responseDoc = new DOMParser().parseFromString(
                            responseText,
                            "text/html"
                        );
                        const responseElement =
                            responseDoc.getElementsByTagName("ul")[2]
                                .firstElementChild;
                        //DOM read
                        var urlForeign =
                            "https://www.fmprc.gov.cn/web/fyrbt_673021" +
                            responseElement.innerHTML.split('"')[1].slice(1);
                        var dateForeign =
                            responseElement.textContent.split("外")[0];
                        //change state
                        changeForeign([urlForeign, dateForeign]);
                    });

                //상무부 proxy
                fetch("/slfw/?q=proxy")
                    .then((response) => response.text())
                    .then((responseText) => {
                        //DOM scrape
                        const responseDoc = new DOMParser().parseFromString(
                            responseText,
                            "text/html"
                        );
                        // console.log(responseDoc);
                        const responseElement =
                            responseDoc.getElementsByTagName("ul")[1]
                                .children[1];
                        // console.log(responseElement);
                        const str = responseElement.textContent;
                        //DOM read
                        var urlCommerce =
                            "http://www.mofcom.gov.cn" +
                            responseElement.innerHTML.split('"')[5];
                        var dateCommerce = str.substring(
                            str.indexOf("（") + 1,
                            str.indexOf("）")
                        );
                        //change state
                        changeCommerce([urlCommerce, dateCommerce]);
                    });
                // //상무부 chrome extension
                // fetch("http://www.mofcom.gov.cn/article/ae/slfw/")
                //     .then((response) => response.text())
                //     .then((responseText) => {
                //         //DOM scrape
                //         const responseDoc = new DOMParser().parseFromString(
                //             responseText,
                //             "text/html"
                //         );
                //         console.log(responseDoc);
                //         const responseElement =
                //             responseDoc.getElementsByTagName("ul")[1]
                //                 .children[1];
                //         console.log(responseElement);
                //         const str = responseElement.textContent;
                //         //DOM read
                //         var urlCommerce =
                //             "http://www.mofcom.gov.cn" +
                //             responseElement.innerHTML.split('"')[5];
                //         var dateCommerce = str.substring(
                //             str.indexOf("（") + 1,
                //             str.indexOf("）")
                //         );
                //         //change state
                //         changeCommerce([urlCommerce, dateCommerce]);
                //     });
            } catch (error) {
                console.error(error);
            }
        };

        fetchContents();
    }, []);

    return (
        <div>
            <header>
                <h1>CScrape</h1>
            </header>
            <main>
                <section>
                    <h2>국방부</h2>
                    <a
                        target="_blank"
                        href="http://www.mod.gov.cn/jzhzt/node_47321.htm"
                    >
                        바로가기
                    </a>
                    <br />
                    <a target="_blank" href={Defense[0]}>
                        최신 브리핑 날짜: {Defense[1]}
                    </a>
                </section>
                <section>
                    <h2>외교부</h2>
                    <a
                        target="_blank"
                        href="https://www.fmprc.gov.cn/web/fyrbt_673021/"
                    >
                        바로가기
                    </a>
                    <br />
                    <a target="_blank" href={Foreign[0]}>
                        최신 브리핑 날짜: {Foreign[1]}
                    </a>
                </section>
                <section>
                    <h2>상무부</h2>
                    <a
                        target="_blank"
                        href="http://www.mofcom.gov.cn/article/ae/slfw/"
                    >
                        바로가기
                    </a>
                    <br />
                    <a target="_blank" href={Commerce[0]}>
                        최신 브리핑 날짜: {Commerce[1]}
                    </a>
                </section>
            </main>
        </div>
    );
}
