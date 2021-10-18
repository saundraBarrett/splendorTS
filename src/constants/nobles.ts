import { Gems } from './gems';

const nobles = [
    {
        id: 11,
        victoryPoints: 3,
        backgroundPosition: '75% 95%',
        imageCode: "CAT_MEDICI",
        cost: [{ gem: Gems.GREEN, qty: 2 }]
    },
    {
        id: 1,
        victoryPoints: 3,
        backgroundPosition: '75% 95%',
        imageCode: "CAT_MEDICI",
        cost: [{ gem: Gems.GREEN, qty: 3 },
            { gem: Gems.BLUE, qty: 3 },
            { gem: Gems.RED, qty: 3 }]
    },
    {
        id: 2,
        victoryPoints: 3,
        backgroundPosition: '0% 95%',
        imageCode: "ELI_AUSTRIA",
        cost: [{ gem: Gems.BLUE, qty: 3 },
            { gem: Gems.BLACK, qty: 3 },
            { gem: Gems.WHITE, qty: 3 }]
    },
    {
        id: 3,
        victoryPoints: 3,
        backgroundPosition: '75% 5%',
        imageCode: "ISA_CASTILE",
        cost: [{ gem: Gems.BLACK, qty: 4 },
            { gem: Gems.WHITE, qty: 4 }]
    },
    {
        id: 4,
        victoryPoints: 3,
        backgroundPosition: '50% 5%',
        imageCode: "NIC_MACHIA",
        cost: [{ gem: Gems.BLUE, qty: 4 },
            { gem: Gems.WHITE, qty: 4 }]
    },
    {
        id: 5,
        victoryPoints: 3,
        backgroundPosition: '25% 5%',
        imageCode: "SUL_MAGNI",
        cost: [{ gem: Gems.BLUE, qty: 4 },
            { gem: Gems.GREEN, qty: 4 }]
    },
    {
        id: 6,
        victoryPoints: 3,
        backgroundPosition: '100% 95%',
        imageCode: "ANN_BRITAN",
        cost: [{ gem: Gems.GREEN, qty: 3 },
            { gem: Gems.BLUE, qty: 3 },
            { gem: Gems.WHITE, qty: 3 }]
    },
    {
        id: 7,
        victoryPoints: 3,
        backgroundPosition: '50% 95%',
        imageCode: "CHARLES_V",
        cost: [{ gem: Gems.BLACK, qty: 3 },
            { gem: Gems.RED, qty: 3 },
            { gem: Gems.WHITE, qty: 3 }]
    },
    {
        id: 8,
        victoryPoints: 3,
        backgroundPosition: '25% 95%',
        imageCode: "FRAN_FRANCE",
        cost: [{ gem: Gems.BLACK, qty: 3 },
            { gem: Gems.RED, qty: 3 },
            { gem: Gems.GREEN, qty: 3 }]
    },
    {
        id: 9,
        victoryPoints: 3,
        backgroundPosition: '100% 5%',
        imageCode: "HENRY_VIII",
        cost: [{ gem: Gems.BLACK, qty: 4 },
            { gem: Gems.RED, qty: 4 }]
    },
    {
        id: 10,
        victoryPoints: 3,
        backgroundPosition: '0% 5%',
        imageCode: "MARY_STUART",
        cost: [{ gem: Gems.GREEN, qty: 4 },
            { gem: Gems.RED, qty: 4 }]
    }
];

export default nobles;