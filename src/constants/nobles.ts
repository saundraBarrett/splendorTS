import { Gems } from './gems';

const nobles = [
    {
        id: 1,
        victoryPoints: 3,
        imageCode: "CAT_MEDICI",
        cost: [{ gem: Gems.GREEN, qty: 3 },
            { gem: Gems.BLUE, qty: 3 },
            { gem: Gems.RED, qty: 3 }]
    },
    {
        id: 2,
        victoryPoints: 3,
        imageCode: "ELI_AUSTRIA",
        cost: [{ gem: Gems.BLUE, qty: 3 },
            { gem: Gems.BLACK, qty: 3 },
            { gem: Gems.WHITE, qty: 3 }]
    },
    {
        id: 3,
        victoryPoints: 3,
        imageCode: "ISA_CASTILE",
        cost: [{ gem: Gems.BLACK, qty: 4 },
            { gem: Gems.WHITE, qty: 4 }]
    },
    {
        id: 4,
        victoryPoints: 3,
        imageCode: "NIC_MACHIA",
        cost: [{ gem: Gems.BLUE, qty: 4 },
            { gem: Gems.WHITE, qty: 4 }]
    },
    {
        id: 5,
        victoryPoints: 3,
        imageCode: "SUL_MAGNI",
        cost: [{ gem: Gems.BLUE, qty: 4 },
            { gem: Gems.GREEN, qty: 4 }]
    },
    {
        id: 6,
        victoryPoints: 3,
        imageCode: "ANN_BRITAN",
        cost: [{ gem: Gems.GREEN, qty: 3 },
            { gem: Gems.BLUE, qty: 3 },
            { gem: Gems.WHITE, qty: 3 }]
    },
    {
        id: 7,
        victoryPoints: 3,
        imageCode: "CHARLES_V",
        cost: [{ gem: Gems.BLACK, qty: 3 },
            { gem: Gems.RED, qty: 3 },
            { gem: Gems.WHITE, qty: 3 }]
    },
    {
        id: 8,
        victoryPoints: 3,
        imageCode: "FRAN_FRANCE",
        cost: [{ gem: Gems.BLACK, qty: 3 },
            { gem: Gems.RED, qty: 3 },
            { gem: Gems.GREEN, qty: 3 }]
    },
    {
        id: 9,
        victoryPoints: 3,
        imageCode: "HENRY_VIII",
        cost: [{ gem: Gems.BLACK, qty: 4 },
            { gem: Gems.RED, qty: 4 }]
    },
    {
        id: 10,
        victoryPoints: 3,
        imageCode: "MARY_STUART",
        cost: [{ gem: Gems.GREEN, qty: 4 },
            { gem: Gems.RED, qty: 4 }]
    }
];

export default nobles;