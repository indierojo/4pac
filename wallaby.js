module.exports = function() {
    return {
        'files': [
            'src/**/*.ts'
        ], 'tests': [
            'test/**/*Spec.ts'
        ],
        env: {
            type: 'node'
        }
    };
};