module.exports = function(wallaby) {
    return {
        'files': [
            'src/**/*.ts',
            'src/*.ts'
        ], 'tests': [
            'test/**/*Spec.ts',
            'test/*Spec.ts'
        ],
        env: {
            type: 'node'
        },
        compilers: {
            '**/*.ts': wallaby.compilers.typeScript({
                module: 'commonjs',
            })
        }
    };
};