# configtxgen -profile swastha_network -outputBlock ./network-config/orderer.block
# configtxgen -profile OneOrgsChannel -outputCreateChannelTx ./network-config/channel.tx -channelID mychannel
# configtxgen -profile OneOrgsChannel -outputAnchorPeersUpdate ./network-config/Org1MSPanchors.tx -channelID mychannel -asOrg Org1MSP
export PATH=${PWD}/bin:${PWD}:$PATH
export FABRIC_CFG_PATH=${PWD}/fabric-config
docker-compose -f docker/docker-compose-kafka.yml up -d
docker-compose -f docker/docker-compose-cli.yml up -d

docker exec -e "CORE_PEER_LOCALMSPID=vendorMSP" -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@vendor.in.swastha.com/msp" peer0.vendor.in.swastha.com peer channel create -o orderer0.in.swastha.com:7050 -c commonchannel -f /var/hyperledger/configs/channel.tx
docker exec -e "CORE_PEER_LOCALMSPID=vendorMSP" -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@vendor.in.swastha.com/msp" peer0.vendor.in.swastha.com peer channel join -b commonchannel.block
docker cp peer0.vendor.in.swastha.com:/commonchannel.block .
docker cp commonchannel.block peer0.manufacture.in.swastha.com:/commonchannel.block
docker cp commonchannel.block peer0.distributor.in.swastha.com:/commonchannel.block
docker cp commonchannel.block peer0.retailer.in.swastha.com:/commonchannel.block
docker cp commonchannel.block peer0.regulator.in.swastha.com:/commonchannel.block
rm commonchannel.block
docker exec -e "CORE_PEER_LOCALMSPID=manufactureMSP" -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@manufacture.in.swastha.com/msp" peer0.manufacture.in.swastha.com peer channel join -b commonchannel.block
docker exec -e "CORE_PEER_LOCALMSPID=distributorMSP" -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@distributor.in.swastha.com/msp" peer0.distributor.in.swastha.com peer channel join -b commonchannel.block
docker exec -e "CORE_PEER_LOCALMSPID=retailerMSP" -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@retailer.in.swastha.com/msp" peer0.retailer.in.swastha.com peer channel join -b commonchannel.block
docker exec -e "CORE_PEER_LOCALMSPID=regulatorMSP" -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@regulator.in.swastha.com/msp" peer0.regulator.in.swastha.com peer channel join -b commonchannel.block


docker exec -it cli.vendor.in.swastha.com peer chaincode install -l node -n SwasthaContract -p /opt/gopath/src/github.com/chaincode -v v0
docker exec -it cli.manufacture.in.swastha.com peer chaincode install -l node -n SwasthaContract -p /opt/gopath/src/github.com/chaincode -v v0
docker exec -it cli.distributor.in.swastha.com peer chaincode install -l node -n SwasthaContract -p /opt/gopath/src/github.com/chaincode -v v0
docker exec -it cli.retailer.in.swastha.com peer chaincode install -l node -n SwasthaContract -p /opt/gopath/src/github.com/chaincode -v v0
docker exec -it cli.regulator.in.swastha.com peer chaincode install -l node -n SwasthaContract -p /opt/gopath/src/github.com/chaincode -v v0


docker exec -it cli.vendor.in.swastha.com peer chaincode instantiate -o orderer0.in.swastha.com:7050 -C commonchannel -n SwasthaContract /opt/gopath/src/github.com/chaincode SwasthaContract  -v v0 -c '{"Args": ["initLedger"]}'
# docker exec -it cli.manufacture.in.swastha.com peer chaincode instantiate -o orderer0.in.swastha.com:7050 -C commonchannel -n SwasthaContract /opt/gopath/src/github.com/chaincode SwasthaContract  -v v0 -c '{"Args": ["initLedger"]}'
# docker exec -it cli.distributor.in.swastha.com peer chaincode instantiate -o orderer0.in.swastha.com:7050 -C commonchannel -n SwasthaContract /opt/gopath/src/github.com/chaincode SwasthaContract  -v v0 -c '{"Args": ["initLedger"]}'
# docker exec -it cli.retailer.in.swastha.com peer chaincode instantiate -o orderer0.in.swastha.com:7050 -C commonchannel -n SwasthaContract /opt/gopath/src/github.com/chaincode SwasthaContract  -v v0 -c '{"Args": ["initLedger"]}'
# docker exec -it cli.regulator.in.swastha.com peer chaincode instantiate -o orderer0.in.swastha.com:7050 -C commonchannel -n SwasthaContract /opt/gopath/src/github.com/chaincode SwasthaContract  -v v0 -c '{"Args": ["initLedger"]}'

# docker exec -it cli.manufacture.in.swastha.com peer chaincode invoke -o orderer0.in.swastha.com:7050 -n SwasthaContract -c '{"Args":["manufacture_generate_po", "{\"po_no\":\"1231312\", \"docType\":\"manufacture_po\", \"created_by\":\"Gaurav\"}"]}' -C commonchannel