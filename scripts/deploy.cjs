const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Starting BlueChain Registry smart contract deployment...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 1. Deploy BlueCarbonRegistry
  const RegistryFactory = await hre.ethers.getContractFactory("BlueCarbonRegistry");
  const registry = await RegistryFactory.deploy();
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();
  console.log("BlueCarbonRegistry deployed to:", registryAddress);

  // 2. Deploy BlueCarbonToken with Registry address
  const TokenFactory = await hre.ethers.getContractFactory("BlueCarbonToken");
  const token = await TokenFactory.deploy(registryAddress);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("BlueCarbonToken deployed to:", tokenAddress);

  // 3. Link Token to Registry
  const setTx = await registry.setCarbonToken(tokenAddress);
  await setTx.wait();
  console.log("Registry linked to Token contract successfully.");

  // 4. Seed initial projects on-chain
  console.log("Seeding initial blue carbon projects on-chain...");

  const initialProjects = [
    {
      id: 'BC-2026-IND-001',
      name: 'Sundarbans Biosphere Mangrove Restoration Phase 2',
      ecosystem: 0, // Mangrove
      description: 'High-density Avicennia marina mangrove plantation across 450 hectares of coastal mudflats, mitigating cyclone surges and sequestering atmospheric CO2 into saline soils.',
      state: 'West Bengal',
      district: 'South 24 Parganas',
      gps: '21.9497, 88.8834',
      areaHectares: 450,
      estimatedCarbon: 2925,
      ipfsHash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
      verify: true,
      creditsToMint: 2925,
      remarks: 'Satellite LiDAR & soil core samples verified by Ministry of Environment & Forests. Smart Contract minted 2,925 BCT tokens.'
    },
    {
      id: 'BC-2026-IND-002',
      name: 'Gulf of Mannar Seagrass Ecosystem Recovery',
      ecosystem: 1, // Seagrass
      description: 'Restoration of Cymodocea serrulata seagrass beds in coastal Palk Bay waters, creating Dugong habitats while storing sediment carbon.',
      state: 'Tamil Nadu',
      district: 'Ramanathapuram',
      gps: '9.2876, 79.1500',
      areaHectares: 320,
      estimatedCarbon: 1344,
      ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
      verify: true,
      creditsToMint: 1344,
      remarks: 'Hydro-acoustic sonar mapping confirmed dense seagrass cover. High carbon trapping efficiency.'
    },
    {
      id: 'BC-2026-IND-003',
      name: 'Chilika Wetland Salt Marsh Protection Project',
      ecosystem: 2, // Salt Marsh
      description: 'Protection and sustainable tidal flow management of brackish coastal salt marshes along Chilika Lagoon to preserve deep peat soil carbon pools.',
      state: 'Odisha',
      district: 'Puri',
      gps: '19.6800, 85.3400',
      areaHectares: 510,
      estimatedCarbon: 2601,
      ipfsHash: 'QmW2WqiRUz13qMBCFdhL9i32Nd15xij5Sr3sD1231f456',
      verify: false,
      creditsToMint: 0,
      remarks: ''
    }
  ];

  for (const proj of initialProjects) {
    try {
      const regTx = await registry.registerProject(
        proj.id,
        proj.name,
        proj.ecosystem,
        proj.description,
        proj.state,
        proj.district,
        proj.gps,
        proj.areaHectares,
        proj.estimatedCarbon,
        proj.ipfsHash
      );
      await regTx.wait();
      console.log(`Registered on-chain project: ${proj.id} (${proj.name})`);

      if (proj.verify) {
        const verTx = await registry.verifyAndIssueCredits(
          proj.id,
          proj.creditsToMint,
          proj.remarks
        );
        await verTx.wait();
        console.log(`Verified & minted BCT tokens for: ${proj.id}`);
      }
    } catch (err) {
      console.warn(`Failed to seed project ${proj.id}:`, err.message);
    }
  }

  // 5. Export contract addresses and ABIs to frontend directory
  const contractsDir = path.join(__dirname, "..", "src", "contracts");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  const addresses = {
    registryAddress,
    tokenAddress,
    network: hre.network.name,
    chainId: hre.network.config.chainId || 31337
  };

  fs.writeFileSync(
    path.join(contractsDir, "deployedAddresses.json"),
    JSON.stringify(addresses, null, 2)
  );

  const registryArtifact = hre.artifacts.readArtifactSync("BlueCarbonRegistry");
  fs.writeFileSync(
    path.join(contractsDir, "BlueCarbonRegistry.json"),
    JSON.stringify(registryArtifact.abi, null, 2)
  );

  const tokenArtifact = hre.artifacts.readArtifactSync("BlueCarbonToken");
  fs.writeFileSync(
    path.join(contractsDir, "BlueCarbonToken.json"),
    JSON.stringify(tokenArtifact.abi, null, 2)
  );

  console.log("Contract deployment & frontend ABI export completed successfully!");
  console.log("Addresses exported to src/contracts/deployedAddresses.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
