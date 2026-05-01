import Head from "next/head";
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { mediaQueries } from "@/styles/mixins/MediaQueries";
import { COLORS } from "@/styles/variables/Colors";
import { AddNewDailyData } from "@/components/organisms/AddNewDailyData";
import { SearchDailyDatas } from "@/components/organisms/SearchDailyDatas";
import { DailyDatasList } from "@/components/organisms/DailyDatasList";
import { useDailyDatas } from "@/helpers/hooks/useDailyDatas";
import Centering from "@/components/templates/Centering";
import { DailyDataItemType } from "@/helpers/common/DataTypes";
import { LoginContent } from "@/components/organisms/LoginContent";

export default function Home() {
  type keywordType = string;
  const { dailyDatas } = useDailyDatas();
  const [keyword, setKeyword] = useState<keywordType>("");
  const [sortingArr, setSortingArr] = useState<DailyDataItemType[]>(dailyDatas);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("isLogin") === "true") {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Daily pieces App</title>
        <meta name="description" content="Daily pieces App" />
        <meta name="theme-color" content="#5f9ea0" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main css={styles.global}>
        {
          isLogin ? (
            <>
              <SearchDailyDatas keyword={keyword} setKeyword={setKeyword} />
              <Centering _css={styles.mqCentering}>
                <div css={styles.mqWrap}>
                  <AddNewDailyData sortingArr={sortingArr} />
                  <DailyDatasList
                    keyword={keyword}
                    sortingArr={sortingArr}
                    setSortingArr={setSortingArr}
                  />
                </div>
              </Centering>
            </>
          ) : (
            <LoginContent setIsLogin={setIsLogin} />
          )
        }

      </main>
    </>
  );
}

const styles = {
  global: css`
    font-family: "Noto Sans KR", "sans-serifui-monospace", "Menlo", "Monaco",
      "Cascadia Mono", "Segoe UI Mono";
    margin: 0;
    padding: 0;
  `,
  mqCentering: css`
    margin: 0;

    ${mediaQueries("md")} {
      height: 100vh;
      overflow: hidden;
      margin-right: auto;
      margin-left: auto;
    }
  `,
  mqWrap: css`
    margin-top: 70px;
    ${mediaQueries("md")} {
      display: flex;
      justify-content: space-between;
    }
  `,
  title: css`
    color: ${COLORS.BASECOLOR};
    margin-bottom: 100px;

    ${mediaQueries("md")} {
      margin-bottom: 47px;
    }
  `,
};
