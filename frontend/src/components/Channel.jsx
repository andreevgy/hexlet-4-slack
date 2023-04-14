import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import React from "react";
import { useTranslation } from "react-i18next";

const Channel = ({
  channel,
  isCurrent,
  handleChoose,
  handleRemove,
  handleRename,
}) => {
  const { t } = useTranslation();

  const variant = isCurrent ? "secondary" : null;

  return (
    <li key={channel.id} className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          type="button"
          variant={variant}
          key={channel.id}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={handleChoose}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        {channel.removable && (
        <>
          <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
            <span className="visually-hidden">{t("channels.menu")}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRemove}>{t("channels.remove")}</Dropdown.Item>
            <Dropdown.Item onClick={handleRename}>{t("channels.rename")}</Dropdown.Item>
          </Dropdown.Menu>
        </>
        )}
      </Dropdown>
    </li>
  );
};

export default Channel;
