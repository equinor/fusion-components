import * as React from "react";

export default ({ scale=1 }) => (
    <svg width={72} height={72} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `scale(${scale})` }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M69 36C69 54.2254 54.2256 69 36 69C27.6885 69 20.0938 65.9271 14.292 60.8555L60.7129 14.1297C65.8691 19.9523 69 27.6105 69 36ZM58.624 11.9758C52.7168 6.41058 44.7568 3 36 3C17.7744 3 3 17.7746 3 36C3 44.8343 6.47168 52.8578 12.125 58.7809L58.624 11.9758ZM72 36C72 55.8823 55.8818 72 36 72C16.1182 72 0 55.8823 0 36C0 16.1177 16.1182 0 36 0C55.8818 0 72 16.1177 72 36Z" fill="#CCCCCC"/>
    </svg>
);