import React from 'react';

const RightAlignElement: React.FC<{ attributes: any, element: any, children?: React.ReactNode }> = ({ attributes, children }) => (
	<div {...attributes} style={{textAlign: 'right'}}>
		{children}
	</div>
);

export default RightAlignElement;
