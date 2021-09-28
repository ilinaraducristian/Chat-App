import styled from "styled-components";

type ComponentProps = {
    as?: any
}

function XSVG({as}: ComponentProps) {
    return (
        <Svg as={as} viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"/>
        </Svg>
    )
}

/* CSS */

const Svg = styled.svg`
  width: 24px;
  height: 24px;
`;

/* CSS */

export default XSVG;