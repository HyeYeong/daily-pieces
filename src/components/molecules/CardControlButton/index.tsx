import { COLORS } from "@/styles/variables/Colors";
import { css, SerializedStyles } from "@emotion/react";
import React, { FC, MouseEvent, useEffect, useState } from "react";
import { useDailyDatas } from "@/helpers/hooks/useDailyDatas";
import Icon from "@/components/atoms/Icon";
import { DailyDataItemType } from "@/helpers/common/DataTypes";

import {
  MINUS_CLASS_NAME,
  MINUS_HOVER_CLASS_NAME,
  PENCIL_CLASS_NAME,
  PENCIL_HOVER_CLASS_NAME,
} from "@/styles/variables/Icons";

type ButtonType = "EDIT" | "DELETE";
interface PropTypes {
  buttonType: ButtonType;
  iconColor?: string;
  isHover?: boolean;
  itemId?: number | string;
  _css?: SerializedStyles | SerializedStyles[];
  sortingArr: DailyDataItemType[];
  setSortingArr: React.Dispatch<React.SetStateAction<DailyDataItemType[]>>;
}

export const CardControlButton: FC<PropTypes> = ({
  _css,
  iconColor = COLORS.CADET_BLUE,
  isHover = false,
  buttonType,
  itemId,
  sortingArr,
  setSortingArr,
}) => {
  const { setDailyDatas } = useDailyDatas();
  const [isLastData, setIsLastData] = useState(false);

  const iconType = (buttonType: ButtonType) => {
    switch (buttonType) {
      case "EDIT":
        return {
          class: PENCIL_CLASS_NAME,
          hoverClass: PENCIL_HOVER_CLASS_NAME,
        };
      case "DELETE":
        return {
          class: MINUS_CLASS_NAME,
          hoverClass: MINUS_HOVER_CLASS_NAME,
        };
    }
  };

  const setIcon = (buttonType: ButtonType) => {
    return (
      <Icon
        classNames={iconType(buttonType).class}
        hoverClassNames={iconType(buttonType).hoverClass}
        iconColor={iconColor}
        isHover={isHover}
      />
    );
  };

  useEffect(() => {
    if (sortingArr.length === 1) setIsLastData(true);
    setDailyDatas(() => sortingArr);
  }, [sortingArr]);

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    const targetId = parseInt(event.currentTarget.offsetParent!.id, 10);
    if (isLastData) window.localStorage.removeItem("dailyDatas");
    return setSortingArr(sortingArr.filter((data) => data.id !== targetId));
  };

  const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
    let data = event.currentTarget.offsetParent;
    const targetId = parseInt(event.currentTarget.offsetParent!.id, 10);
    const targetData = sortingArr.find((data) => data.id === targetId);
    console.log("EDIT", targetData);
  };

  return (
    <button
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        buttonType === "DELETE" ? handleDelete(event) : handleEdit(event);
      }}
      css={[styles.iconButtonReset, _css]}
    >
      {setIcon(buttonType)}
    </button>
  );
};

const styles = {
  iconButtonReset: css`
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
  `,
};
