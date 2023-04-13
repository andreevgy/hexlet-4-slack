import React from "react";
import { useSelector } from "react-redux";
import Channel from "./Channel";

const ChannelsList = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsState);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelId}
          />
        ))}
      </ul>
    </>
  );
};

export default ChannelsList;
