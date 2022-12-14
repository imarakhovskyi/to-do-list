import React, { useCallback, useEffect, useState } from "react";
import { DragLayerMonitor, useDragLayer } from "react-dnd";

import { DataListItem } from "types/list-types";
import { DragItem, ListProps } from "./types";
import { ListItem } from "./list-item";
import { withListWrapper } from "./withListWrapper";
import { rearrangeDnDList } from "./helpers";
import { StyledList } from "./styled";

const List = ({
  data,
  className,
  isItemsDraggable = false,
  children,
  onListItemsOrderChange,
}: ListProps) => {
  const [listItemsData, setListItemsData] = useState(data);

  useEffect(() => {
    setListItemsData(data);
  }, [data]);

  const { draggedItem } = useDragLayer((monitor: DragLayerMonitor) => ({
    draggedItem: monitor.getItem<DragItem>(),
  }));

  const moveListItem = useCallback(
    (hoverIndex: number) => {
      setListItemsData((prevDataList) => {
        if (!prevDataList) {
          return;
        }

        const newDataList = rearrangeDnDList({
          dragIndex: draggedItem.index,
          hoverIndex,
          dataList: prevDataList,
        });

        if (onListItemsOrderChange) {
          onListItemsOrderChange(newDataList); // Pass new data items list to parent after reorder
        }

        return newDataList;
      });
    },
    [draggedItem, onListItemsOrderChange]
  );

  const renderListItem = useCallback(
    (data: DataListItem, index: number) => {
      return (
        <ListItem
          key={data.id}
          id={data.id}
          index={index}
          isDraggable={isItemsDraggable}
          moveListItem={moveListItem}
        >
          {children?.(data)}
        </ListItem>
      );
    },
    [isItemsDraggable, children, moveListItem]
  );

  return (
    <StyledList className={className}>
      {listItemsData?.map(renderListItem)}
    </StyledList>
  );
};

const WrappedList = withListWrapper(List);

export { WrappedList as List };
