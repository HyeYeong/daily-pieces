import { css, SerializedStyles } from "@emotion/react";
import React, { FC, useEffect, useState, useMemo } from "react";
import { Title } from "@/components/atoms/Title";
import ContentsWrap from "@/components/templates/ContentsWrap";
import { CardCategories } from "@/components/molecules/CardCategories";
import { DailyDataCard } from "@/components/molecules/DailyDataCard";
import { useDailyDatas } from "@/helpers/hooks/useDailyDatas";
import { DailyDataItemType, tagType } from "@/helpers/common/DataTypes";
import { mediaQueries } from "@/styles/mixins/MediaQueries";
import { COLORS } from "@/styles/variables/Colors";
import { MESSAGES } from "@/constants/messages";

interface PropTypes {
  _css?: SerializedStyles | SerializedStyles[];
  keyword: string;
  sortingArr: DailyDataItemType[];
  setSortingArr: React.Dispatch<React.SetStateAction<DailyDataItemType[]>>;
}

export const DailyDatasList: FC<PropTypes> = ({
  _css,
  keyword,
  sortingArr,
  setSortingArr,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { dailyDatas } = useDailyDatas();
  const isLoaded = !!Object.keys(dailyDatas).length;

  const [sortState, setSortState] = useState<tagType>("all");
  const [isSortDate, setIsSortDate] = useState(true);
  const [isSortAlphabet, setIsSortAlphabet] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const processedArr = useMemo(() => {
    let arr = [...sortingArr];

    // 1. 키워드 검색
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      arr = arr.filter((dailyData) => {
        return !!(
          dailyData.title?.toLowerCase().includes(lowerKeyword) ||
          dailyData.comment?.toLowerCase().includes(lowerKeyword) ||
          dailyData.date?.toLowerCase().includes(lowerKeyword)
        );
      });
    }

    // 2. 카테고리별 필터링
    if (sortState !== "all") {
      arr = arr.filter((dailyData) => dailyData.sort === sortState);
    }

    // 3. 가나다순 정렬
    arr.sort((a, b) => {
      const titleA = a.title || "";
      const titleB = b.title || "";
      return isSortAlphabet
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });

    // 4. 날짜순 정렬
    arr.sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      if (aDate === bDate) return 0;
      return isSortDate ? bDate - aDate : aDate - bDate;
    });

    return arr;
  }, [sortingArr, keyword, sortState, isSortAlphabet, isSortDate]);

  const errorMsg = () => {
    return (
      <p css={styles.emptyData}>
        {MESSAGES.EMPTY_DATA}
      </p>
    );
  };

  if (!mounted || !isLoaded) {
    return (
      <ContentsWrap _css={styles.wrap}>
        <section css={styles.cardsBlock}>
          <Title element="H2" _css={styles.title}>
            그간의 기록들
          </Title>
          {errorMsg()}
        </section>
      </ContentsWrap>
    );
  }

  return (
    <ContentsWrap _css={styles.wrap}>
      <Title element="H2" _css={styles.title}>
        그간의 기록들
      </Title>

      <CardCategories setSortState={setSortState} selectedTag={sortState} />
      {/* 검색기능 추가하기 */}

      <div css={styles.sortButtons}>
        <button
          css={styles.sortBtn}
          onClick={() => setIsSortDate(!isSortDate)}
        >
          {isSortDate ? "최신순 ↓" : "오래된순 ↑"}
        </button>
        <button
          css={styles.sortBtn}
          onClick={() => setIsSortAlphabet(!isSortAlphabet)}
        >
          {isSortAlphabet ? "가나다순 ↓" : "가나다 역순 ↑"}
        </button>
      </div>

      <section css={styles.cardsBlock}>
        {processedArr.length > 0
          ? processedArr.map((item: DailyDataItemType) => (
            <DailyDataCard
              item={item}
              key={item.id}
              sortingArr={sortingArr}
              setSortingArr={setSortingArr}
            />
          ))
          : errorMsg()}
      </section>
    </ContentsWrap>
  );
};

const styles = {
  wrap: css`
    padding: 24px 15px 0 15px;
    background-color: ${COLORS.GRAY[1]};
    ${mediaQueries("md")} {
      padding-top: 0;
      width: calc(50% - 15px);
      box-sizing: border-box;
      border-left: 1px dashed ${COLORS.CADET_BLUE};
      background-color: transparent;
    }
  `,
  cardsBlock: css`
    ${mediaQueries("md")} {
      overflow-y: scroll;
      height: calc(100vh - 280px);
      padding: 8px;
    }
  `,
  title: css`
    margin-bottom: 16px;
  `,
  emptyData: css`
    line-height: 2rem;
    color: ${COLORS.GRAY[0]};
  `,
  sortButtons: css`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  `,
  sortBtn: css`
    padding: 6px 12px;
    border-radius: 20px;
    border: 1px solid ${COLORS.CADET_BLUE};
    background-color: white;
    color: ${COLORS.CADET_BLUE};
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${COLORS.CADET_BLUE};
      color: white;
    }
  `,
};
