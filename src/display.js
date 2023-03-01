import styled from "styled-components";

export const ResultTable = styled.table`
    
    line-height: 1.4;
    border: 1px grey solid;
    position: absolute;
    top: 40px;
    background-color: lightgrey;
    width: 200px;

    tbody {
        display: flex;
        flex-direction: column;
        tr {
            cursor: pointer;
            padding: 2px;
            border-bottom: 1px grey solid;

            &:last-child {
                border-bottom: none;
            }
        }
    }

`;

export const CityList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px
`;

export const WeatherSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px

`;

export const WeatherTable = styled.table`
    font-weight: normal;
    width: 200px;
    thead {
        text-decoration: underline;
    }
    th {
        font-weight: normal;
    }

`;
