import React from 'react';

const TryAgain = (props) => (
		<div className="try-again-wrap">
			<div onClick={props.fetch} className="try-again-btn">Произошла ошибка, попробовать повторить запрос?</div>
		</div>
);


export default (TryAgain);
