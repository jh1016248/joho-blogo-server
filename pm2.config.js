module.exports = {
  apps: [
    {
      name: 'joho-blog', // 应用名称
      script: './app.js', // 启动文件地址
      cwd: './', // 当前工作路径
      node_args: '--harmony', // node的启动模式
      instance_var: 'INSTANCE_ID',
      exec_mode : "fork",
      watch: [
        "controller",
        'models',
        'routes',
        'config',
      ],
      ignore_watch : ["node_modules", "public", 'logs'],
      watch_options: {
        "followSymlinks": false
      },
      instances : 1,
      env: {
        NODE_ENV: 'production', // 设置运行环境，此时process.env.NODE_ENV的值就是development
      },
      env_dev: {
        NODE_ENV: 'development',
      },
      out_file: './logs/out.log', // 普通日志路径
      error_file: './logs/err.log', // 错误日志路径
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
}