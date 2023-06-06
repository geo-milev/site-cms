import React from 'react';

const JustifyAlignElement: React.FC<{ attributes: any, element: any, children?: React.ReactNode }> = ({ attributes, children }) => (
	<div {...attributes} style={{textAlign: 'justify'}}>
		{children}
	</div>
);

export default JustifyAlignElement;
