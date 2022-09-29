import { memo, useCallback } from "react";

import { ToDoListItem } from "../../types";
import {
  ButtonBorder,
  ButtonProportion,
  ButtonShadow,
  ButtonVariant,
  Checkbox,
  CheckboxProportion,
  CheckboxShape,
  IconDelete,
  IconVariant,
} from "components/ui-kit";
import {
  DeleteToDoItemButton,
  StyledToDoItem,
  ToDoItemDescription,
} from "./styled";
import { strings } from "./strings";

interface ToDoItemProps {
  itemData: ToDoListItem;
  removeItems?: (idsList: string[]) => void;
  updateItemsState?: (idsList: string[], newState: boolean) => void;
}

const ToDoItem = ({
  itemData,
  removeItems,
  updateItemsState,
}: ToDoItemProps) => {
  const deteleItem = useCallback(() => {
    if (!removeItems) {
      return;
    }

    removeItems([itemData.id]);
  }, [itemData.id, removeItems]);

  const updateItemState = useCallback(
    (newValue: boolean) => {
      if (!updateItemsState) {
        return;
      }

      updateItemsState([itemData.id], newValue);
    },
    [itemData.id, updateItemsState]
  );

  return (
    <StyledToDoItem>
      <Checkbox
        checked={itemData.done}
        shape={CheckboxShape.Circle}
        proportions={CheckboxProportion.Large}
        onChange={updateItemState}
      />
      <ToDoItemDescription title={itemData.name}>
        {itemData.name}
      </ToDoItemDescription>
      {removeItems && (
        <DeleteToDoItemButton
          onClick={deteleItem}
          icon={<IconDelete variant={IconVariant.Error} />}
          title={strings.deleteItemTitle}
          border={ButtonBorder.Light}
          shadow={ButtonShadow.Default}
          proportions={ButtonProportion.Small}
          variant={ButtonVariant.Error}
        />
      )}
    </StyledToDoItem>
  );
};

const MemoizedComp = memo(ToDoItem);

export { MemoizedComp as ToDoItem };
