import { Position } from '@xyflow/react';
import classNames from 'classnames';
import React, { memo, useContext } from 'react';
import NodeContainer from '../../components/NodeContainer';
import { ConfigContext } from '../../models/context';
import ParallelBuildInNodeWidget from './ParallelBuildInNodeWidget';
import { getColorfulModeBackground } from '../../utils';


export default memo((props: any) => {
  const {
    onClick,
    type,
    data,
    position,
    isConnectable,
    selected,
    isHovered,
    handleAddNode,
  } = props;
  const { settingMap, widgets, iconFontUrl, globalConfig, openColorfulMode } = useContext(ConfigContext);
  const nodeSetting = settingMap[type] || {};
  const NodeWidget = widgets[nodeSetting?.nodeWidget] || undefined;
  const nodeDescription = nodeSetting?.description || '';
  const gradientHeight = nodeSetting?.gradientHeight;
  const hideDesc =
    nodeSetting?.nodePanel?.hideDesc ??
    globalConfig?.nodePanel?.hideDesc ??
    false;
  const hideTitleTips = globalConfig?.nodeView?.hideTitleTips ?? false;
  const isSwitchBottom = position === Position.Bottom;
  const SVGWidget = widgets[nodeSetting?.iconSvg]; // 自定义面板配置组件

  return (
    <NodeContainer
      className={classNames('custom-node-code', {
        'switch-node-code-bottom': isSwitchBottom
      })}
      title={data?.title || nodeSetting?.title || 'parallel'}
      icon={{
        type: nodeSetting?.icon?.type || 'icon-parallel',
        style: { fontSize: 14, color: '#fff' },
        bgColor: nodeSetting?.icon?.bgColor || '#06AED4',
      }}
      onClick={onClick}
      hideDesc={hideDesc}
      desc={data?.desc}
      iconFontUrl={iconFontUrl}
      gradientHeight={gradientHeight}
      NodeWidget={
        <ParallelBuildInNodeWidget
          data={data}
          position={position}
          isConnectable={isConnectable}
          selected={selected}
          isHovered={isHovered}
          handleAddNode={handleAddNode}
          CustomNodeWidget={NodeWidget}
          isSwitchBottom={isSwitchBottom}
          nodeSetting={nodeSetting}
        />
      }
      description={nodeDescription} // 不允许用户更改的节点描述
      iconSvg={SVGWidget ? <SVGWidget setting={nodeSetting} /> : false}
      hideTitleTips={hideTitleTips}
      isSwitchBottom={isSwitchBottom}
      nodeSettingTitle={nodeSetting?.title || 'parallel'}
      style={{...getColorfulModeBackground(nodeSetting?.icon?.bgColor, openColorfulMode)}}
    />
  );
});
