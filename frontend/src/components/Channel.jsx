import { Button } from "react-bootstrap";
import React from "react";

const Channel = ({
  channel,
  isCurrent,
  handleChoose,
}) => {
  const variant = isCurrent ? "secondary" : null;

  return (
    <li key={channel.id} className="nav-item w-100">
      <Button
        type="button"
        variant={variant}
        key={channel.id}
        className="w-100 rounded-0 text-start"
        onClick={handleChoose}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
  );
};

export default Channel;