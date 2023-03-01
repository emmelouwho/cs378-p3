import styled from "styled-components";

export const ResultTable = styled.table`
    line-height: 1.4;
    border: 1px grey solid;

    tbody {
        display: flex;
        flex-direction: column;
        tr {
            padding: 2px;
            border-bottom: 1px grey solid;

            &:last-child {
                border-bottom: none;
            }
        }
    }

`;

export const CityList = styled.div`
    position: absolute;
    top: 60px;
    left: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px
`;