import React, {FC, useRef, useEffect} from "react";

export interface ListItem {
    id: number
}

export interface ListItems {
    listItems?: Array<ListItem>
}

const ListCreator: FC<ListItems> = React.memo(({listItems}: ListItems) => {
    let renderItems = useRef<Array<JSX.Element> | undefined>();
    useEffect(() => {
        console.log("List items updated");
        renderItems.current = listItems?.map((item, index) => {
            return <div key={item.id}>
                {item.id}
            </div>
        })
    }, [listItems])
    console.log("List creator render")
    return (
        <React.Fragment>
            {renderItems.current}
        </React.Fragment>
    );
})

export default ListCreator