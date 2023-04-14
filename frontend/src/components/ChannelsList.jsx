import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { PlusSquare } from "react-bootstrap-icons";
import Channel from "./Channel";
import { actions } from "../state";
import { modalTypes } from "./Modal";

const ChannelsList = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsState);
  const dispatch = useDispatch();

  const handleChooseChannel = (channelId) => () => {
    dispatch(actions.setCurrentChannel({ channelId }));
  };
  const handleAddChannel = () => {
    dispatch(actions.openModal({ type: modalTypes.addChannel }));
  };
  const handleRemoveChannel = (channelId) => () => {
    dispatch(actions.openModal({ type: modalTypes.removeChannel, extra: { channelId } }));
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleAddChannel}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
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
            handleChoose={handleChooseChannel(channel.id)}
            handleRemove={handleRemoveChannel(channel.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default ChannelsList;
