import React from 'react';

const CenterAlignElement: React.FC<{ attributes: any, element: any, children?: React.ReactNode }> = ({ attributes, children }) => (
		<div {...attributes} style={{textAlign: 'center'}}>
			{children}
		</div>
);

export default CenterAlignElement;
