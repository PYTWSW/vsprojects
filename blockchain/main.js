// 区块链
// block
// chain

// data
// 之前区块的哈希值
// 自己的哈希值: 它是由存储在区块里的信息算出来的(data + 之前区块的哈希值)
const sha256 = require('crypto-js/sha256')
class Block{
    constructor(data, previousHash){
        this.data = data
        this.previousHash = previousHash
        this.hash = this.computeHash()
    }

    computeHash(){
        return sha256(this.data + this.previousHash).toString()
    }
}

// 新建一个区块
// const block = new Block('转账十元', '123')
// console.log(block)

// chain
// 生成祖先区块
class Chain{
    constructor(){
        this.chain = [this.bigBang()]
    }

    bigBang(){
        const genesisBlock = new Block('我是祖先', '')
        return genesisBlock;
    }

    // 找到上一个区块
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    // 添加区块到区块链上
    addBlockToChain(newBlock){
        // data
        // 找到最近一个block的hash
        // 这个hash就是新区块的previousHash
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.computeHash()
        this.chain.push(newBlock)
    }

    // 验证当前的区块链是否合法
    // 当前的数据有没有被篡改
    // 要验证当前区块的previousHash是否等于previous区块的hash
    validateChain(){
        if(this.chain.length === 1){
            if(this.chain[0].hash !== this.chain[0].computeHash()){
                return false
            }
            return true
        }
        // this.chain[1]是第二个区块
        // 从第二个区块开始验证
        // 验证到最后一个区块this.chain.length - 1
        for(let i = 1; i < this.chain.length; i++){
            const blockToValidate = this.chain[i]
            // 当前的数据有没有被篡改
            if (blockToValidate.hash !== blockToValidate.computeHash()) {
                console.log('数据篡改')
                return false
            }
            // 要验证当前区块的previousHash是否等于previous区块的hash
            const previousBlock = this.chain[i - 1]
            if(blockToValidate.previousHash !== previousBlock.hash){
                console.log('前后区块链接断裂')
                return false
            }
        }
        return true
    }
}

const wswChain = new Chain()
const block1 = new Block('转账10元', '')
wswChain.addBlockToChain(block1)
const block2 = new Block('转账20元', '')
wswChain.addBlockToChain(block2)
const block3 = new Block('转账30元', '')
wswChain.addBlockToChain(block3)
console.log(wswChain)
console.log(wswChain.validateChain())

// 尝试篡改这个区块链
wswChain.chain[1].data = '转账100元'
wswChain.chain[1].hash = wswChain.chain[1].computeHash()
console.log(wswChain)
console.log(wswChain.validateChain())
