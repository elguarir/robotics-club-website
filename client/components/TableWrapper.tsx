import React, { PropsWithChildren } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

type Props = {};

const TableWrapper = (props: PropsWithChildren) => {
  return (
    <ScrollArea className="w-[calc(100vw-50px)] md:w-[calc(100vw-290px)] max-w-full lg:w-[calc(100vw-340px)] xl:w-[calc(100vw-330px)]">
      {props.children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default TableWrapper;
