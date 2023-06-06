import React from 'react';

const LeftAlignElement: React.FC<{ attributes: any, element: any, children?: React.ReactNode }> = ({ attributes, children }) => (
	<div {...attributes} style={{textAlign: 'left'}}>
		{children}
	</div>
);

export default LeftAlignElement;
