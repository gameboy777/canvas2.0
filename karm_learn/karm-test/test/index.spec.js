describe("运算功能单元测试",function(){
    it("加法函数测试",function(){
        const add5 = add(5)
        expect(add5(5)).toBe(10)
    });

    it("乘法函数测试",function(){
        const multi5 = multi(5)
        expect(multi5(5)).toBe(26)
    })
})
