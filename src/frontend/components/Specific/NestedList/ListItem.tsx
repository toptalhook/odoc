import React from "react";
import {Link} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import {NestedDataItem} from "./NestList";
import {useDispatch, useSelector} from "react-redux";
import { handleRedux } from "../../../redux/store/handleRedux";
import DeleteFile from "../../Actions/delete_file";
import Draggable from "../../General/Draggable";
import ShareIcon from '@mui/icons-material/Share';
import ChangeWorkSpace from "../../Actions/ChangeWorkSpaceFile";
import ContextMenu from "../../General/ContextMenu";

interface ItemProps {
    data: Record<number, NestedDataItem>; // Use Record<number, NestedDataItem> instead of any
    item: NestedDataItem;
    index: number;
    openItems: number[];
    handleClick: (index: number) => void;
    isChild?: boolean;
}

const DocComponent: React.FC<ItemProps> = ({data, item, index, openItems, handleClick, path = null, pl = 1}) => {
    const {profile} = useSelector((state: any) => state.filesReducer);

    const dispatch = useDispatch();

    const html_file_id = `file${item.id}`;
    const isOpen = openItems.includes(index);
    const hasChildren = item.children.length > 0;

    const handleItemClick = () => {
        handleClick(index);
        dispatch(handleRedux("CURRENT_FILE", {file: item}));
    };

    path = path ? path : item.id;
    path = path && path.replace(/\s+/g, '_').toLowerCase();
    path = path && path.replaceAll(".", "")

    let options = [
        // {
        //     content: <RenameFile item={item}/>,
        //     preventClose: true,
        // },
        {content: <DeleteFile item={item}/>, preventClose: true,},
        {content: <ChangeWorkSpace item={item}/>},
    ]

    const handleDrop = async ({draggedId, targetId, dragOverPosition, type, index, clientY}) => {

        let dragged = data.find(f => f.id == draggedId);
        let target = data.find(f => f.id == targetId);
        // logger({dragged, target, dragOverPosition, type, index, clientY});
        let parent = [targetId]
        if (dragOverPosition == 'under') {
            parent = target.parent
        } else if (dragOverPosition == 'above') {
            parent = target.parent
            index--;
        }
        dispatch(handleRedux("CHANGE_FILE_PARENT", {
            position: dragOverPosition,
            id: draggedId,
            parent,
            index: index
        }));
    };


    return (
        <>
            <Link to={path}>
                <ContextMenu options={options}>
                    <Draggable
                        index={index}
                        id={item.id}
                        onDrop={handleDrop}
                    >
                        <ListItemButton
                            id={html_file_id} onClick={handleItemClick} sx={{pl}}>
                            {hasChildren && (isOpen ? <ExpandLess/> : <ExpandMore/>)}
                            <ListItemText primary={<>
                                {item.name} {item.author != profile.id && <ShareIcon size={"small"}/>}
                            </>}/>
                        </ListItemButton>
                    </Draggable>
                </ContextMenu>
            </Link>
            {hasChildren && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {[...item.children].map((childId, childIndex) => {
                            const childItem = data.find(f => f.id == childId)
                            if (childItem) {
                                return (
                                    <DocComponent
                                        path={path + "/" + childItem.id}
                                        key={childItem.id}
                                        data={data}
                                        item={childItem}
                                        index={index + childIndex + 1}
                                        openItems={openItems}
                                        handleClick={handleClick}
                                        pl={pl + 3} // Pass the isChild prop to child items
                                    />
                                );
                            }
                            return null;
                        })}
                    </List>
                </Collapse>
            )}
        </>
    );
};
export default DocComponent;
