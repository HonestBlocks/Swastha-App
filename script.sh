configtxgen -profile swastha_network -outputBlock ./network-config/orderer.block
configtxgen -profile OneOrgsChannel -outputCreateChannelTx ./network-config/channel.tx -channelID mychannel
configtxgen -profile OneOrgsChannel -outputAnchorPeersUpdate ./network-config/Org1MSPanchors.tx -channelID mychannel -asOrg Org1MSP


docker exec -e "CORE_PEER_LOCALMSPID=vendorMSP" -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@vendor.in.swastha.com/msp" peer0.vendor.in.swastha.com peer channel create -o orderer0.in.swastha.com:7050 -c commonchannel -f /var/hyperledger/configs/channel.tx
docker exec -e "CORE_PEER_LOCALMSPID=vendorMSP" -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@vendor.in.swastha.com/msp" peer0.vendor.in.swastha.com peer channel join -b commonchannel.block
docker exec -e "CORE_PEER_LOCALMSPID=manufactureMSP" -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@manufacture.in.swastha.com/msp" peer0.manufacture.in.swastha.com peer channel join -b commonchannel.block
docker exec -e "CORE_PEER_LOCALMSPID=distributorMSP" -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@distributor.in.swastha.com/msp" peer0.distributor.in.swastha.com peer channel join -b commonchannel.block
docker exec -e "CORE_PEER_LOCALMSPID=retailerMSP" -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@retailer.in.swastha.com/msp" peer0.retailer.in.swastha.com peer channel join -b commonchannel.block
docker exec -e "CORE_PEER_LOCALMSPID=regulatorMSP" -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@regulator.in.swastha.com/msp" peer0.regulator.in.swastha.com peer channel join -b commonchannel.block


peer chaincode install -l node -n mycc -p /opt/gopath/src/github.com/mycc -v v0


/opt/gopath/src/github.com/chaincode