import { COLORS } from "@/styles/variables/Colors";
import { css, SerializedStyles } from "@emotion/react";
import React, { FC } from "react";
import { Title } from "@/components/atoms/Title";
import { CardControlButton } from "@/components/molecules/CardControlButton";
import { DailyDataItemType } from "@/helpers/common/DataTypes";
import { Star } from "@/components/atoms/Star";
import Tag from "@/components/atoms/Tag";

interface PropTypes {
  item: DailyDataItemType;
  sortingArr: DailyDataItemType[];
  setSortingArr: React.Dispatch<React.SetStateAction<DailyDataItemType[]>>;
  _css?: SerializedStyles | SerializedStyles[];
}

export const DailyDataCard: FC<PropTypes> = ({
  _css,
  item,
  sortingArr,
  setSortingArr,
}) => {
  const { title, comment, score, date, sort, id } = item;

  //TODO: 데이터 수정 기능 추가하기
  return (
    <article css={[styles.wrap, _css]} id={`${item.id}`}>
      <Title element="H4" _css={styles.title}>
        {title}
      </Title>
      <p css={styles.comment}>{comment}</p>
      <div css={styles.tagDateWrap}>
        <Tag tag={sort} borderStyle={"solid"} />
        <p css={styles.comment}>{date}</p>
      </div>
      <section css={styles.iconSection}>
        {score !== 0 && <Star score={score} />}
        <div css={styles.iconsWrap}>
          <CardControlButton
            itemId={id}
            buttonType="EDIT"
            sortingArr={sortingArr}
            setSortingArr={setSortingArr}
          />
          <CardControlButton
            buttonType="DELETE"
            sortingArr={sortingArr}
            setSortingArr={setSortingArr}
          />
        </div>
      </section>
    </article>
  );
};

const styles = {
  wrap: css`
    padding: 10px 15px 20px;
    border-radius: 10px;
    border: 1px solid ${COLORS.GRAY[1]};
    color: ${COLORS.BASECOLOR};
    background-color: ${COLORS.WHITE};
    margin-bottom: 10px;
    box-shadow: 1px 0px 10px 1px rgba(0, 0, 0, 0.1);
    position: relative;
  `,
  title: css`
    margin-bottom: 10px;
    word-wrap: break-word;
  `,
  tagDateWrap: css`
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 8px;
  `,
  comment: css`
    font-size: 14px;
    line-height: 14px;
    margin: 0;
    word-wrap: break-word;
  `,
  iconSection: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  iconsWrap: css`
    display: flex;
    margin-right: 0;
    margin-left: auto;

    i {
      margin-left: 20px;
      cursor: pointer;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }
  `,
};
