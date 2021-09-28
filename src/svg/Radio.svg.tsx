import styled from "styled-components";

type ComponentProps = {
    as?: any,
    checked?: boolean
};

function RadioSVG({checked = false, as}: ComponentProps) {
    return (
        <Svg viewBox="0 0 24 24" as={as}>
            {checked ?
                <>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          fill="currentColor"/>
                    <Circle cx="12" cy="12" r="5" className="radioIconForeground-XwlXQN" fill="currentColor"/>
                </>
                :
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      fill="currentColor"/>
            }
        </Svg>
    );

}

/* CSS */

const Svg = styled.svg`
  width: 24px;
  height: 24px;
`;

const Circle = styled.circle`
  color: var(--color-23th);
`;

/* CSS */

export default RadioSVG;